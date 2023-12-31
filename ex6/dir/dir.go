package dir

import (
	"fmt"
	"io/ioutil"
	"sort"
)

const ByteInMB float64 = 1024 * 1024

type Directory struct {
	Path string
	Name string
	Size float64
	Type string
}

// dirSize возвращает размер директории
func dirSize(path string) (int64, error) {
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

// GetDirs возвращает массив поддиректорий и их размеров
func GetDirs(root string) ([]Directory, error) {
	fileSlice, err := ioutil.ReadDir(root)
	if err != nil {
		return nil, err
	}
	dirs := make([]Directory, 0, len(fileSlice))
	dirChan := make(chan Directory, len(fileSlice))
	dircount := 0
	for _, dir := range fileSlice {
		if !dir.IsDir() {
			var file Directory
			file.Name = dir.Name()
			file.Path = root
			file.Size = float64(dir.Size()) / ByteInMB
			file.Type = "file"
			dirs = append(dirs, file)
		} else {
			dircount++
			go func(root string, name string, dirs *[]Directory, ch chan<- Directory) {
				size, err := dirSize(fmt.Sprintf("%s/%s", root, name))
				if err != nil {
					fmt.Println(err)
				}
				var dirsi Directory
				dirsi.Name = name
				dirsi.Path = root
				dirsi.Size = float64(size) / ByteInMB
				dirsi.Type = "dir"
				ch <- dirsi
			}(root, dir.Name(), &dirs, dirChan)
		}
	}
	for i := 0; i < dircount; i++ {
		dirs = append(dirs, <-dirChan)
	}
	return dirs, nil
}

// SortDirs сортирует директории по размеру
func SortDirs(dirs []Directory, sortType string) {
	if sortType == "asc" {
		sort.Slice(dirs, func(i, j int) bool {
			return dirs[i].Size < dirs[j].Size
		})
	} else if sortType == "desc" {
		sort.Slice(dirs, func(i, j int) bool {
			return dirs[i].Size > dirs[j].Size
		})
	}
}
