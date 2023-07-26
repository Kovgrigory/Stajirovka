package main

import (
	"flag"
	"fmt"
	"io/fs"
	"io/ioutil"
	"os"
	"sync"
	"time"
)

func dirSize(path string) (int64, error) { //возвращает размер директории
	var size int64
	dirs, err := ioutil.ReadDir(path)
	if err != nil {
		return size, err
	}
	for _, dir := range dirs {
		if dir.IsDir() {
			dsize, err := dirSize(fmt.Sprintf("%s/%s", path, dir.Name()))
			if err == nil {
				size += dsize
			}
		} else {
			size += dir.Size()
		}
	}
	return size, nil
}
func getDirs(root string) ([]fs.FileInfo, []float64, error) { //возвращает массив поддиректорий и их размеров
	dirs, err := ioutil.ReadDir(root)
	if err != nil {
		return nil, nil, err
	}
	sizes := make([]float64, len(dirs))
	var wg sync.WaitGroup
	for i, dir := range dirs {
		if dir.IsDir() {
			wg.Add(1)
			go func(path string, dsize *float64, wg *sync.WaitGroup) {
				size, err := dirSize(path)
				*dsize = float64(size) / 1048576
				if err != nil {
					fmt.Println(err)
				}
				(*wg).Done()
			}(fmt.Sprintf("%s/%s", root, dir.Name()), &sizes[i], &wg)
		}
	}
	wg.Wait()
	return dirs, sizes, nil
}
func sortDirs(dirs *[]fs.FileInfo, sizes *[]float64, sort string) {
	if sort == "asc" {
		for i, _ := range *dirs {
			inMin := i
			for j := i; j < len(*dirs); j++ {
				if (*sizes)[j] < (*sizes)[inMin] {
					inMin = j
				}
			}
			(*dirs)[i], (*dirs)[inMin] = (*dirs)[inMin], (*dirs)[i]
			(*sizes)[i], (*sizes)[inMin] = (*sizes)[inMin], (*sizes)[i]
		}
	} else if sort == "desc" {
		for i, _ := range *dirs {
			inMax := i
			for j := i; j < len(*dirs); j++ {
				if (*sizes)[j] > (*sizes)[inMax] {
					inMax = j
				}
			}
			(*dirs)[i], (*dirs)[inMax] = (*dirs)[inMax], (*dirs)[i]
			(*sizes)[i], (*sizes)[inMax] = (*sizes)[inMax], (*sizes)[i]
		}
	}
}
func main() {
	root := flag.String("root", "/home/gkovalev", "целевая директория")
	limit := flag.Int64("limit", 0, "лимит размера поддиректории")
	sort := flag.String("sort", "asc", "вывод по возрастанию (asc) или убыванию (desc) размера")
	flag.Parse()
	start := time.Now()
	if *sort != "asc" && *sort != "desc" {
		fmt.Println("неверное значение -sort. Применено значение по умолчанию \"asc\"")
		*sort = "asc"
	}
	dirs, sizes, err := getDirs(*root)
	if err != nil {
		fmt.Println(err)
	}
	sortDirs(&dirs, &sizes, *sort)
	outfile, err := os.Create("/home/gkovalev/go/projects/ex4/dirs.txt")
	if err != nil {
		fmt.Println(err)
	}
	defer outfile.Close()
	for i, dir := range dirs {
		if dir.IsDir() {
			fmt.Printf("%s\t%0.3f мбайт\n", dir.Name(), sizes[i])
			if sizes[i] > float64(*limit) {
				outfile.WriteString(fmt.Sprintf("%s\t%0.3f мбайт\n", dir.Name(), sizes[i]))
			}
		}
	}
	fmt.Println(time.Since(start))
}
