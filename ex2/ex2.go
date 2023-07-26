package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"sync"
	"time"
)

func download(url string, dst string) error { //отправляет запрос на адрес url, записывает ответ в новый файл в каталоге dst
	resp, err := http.Get("http://" + url)
	if err != nil {
		return fmt.Errorf("%s не отвечает", url)
	}
	dstfile := fmt.Sprintf("%s/%s.txt", dst, url)
	outfile, err := os.Create(dstfile)
	if err != nil {
		return fmt.Errorf("%s.txt: ошибка при создании файла", url)
	}
	defer outfile.Close()
	io.Copy(outfile, resp.Body)
	return nil
}
func main() {
	start := time.Now()
	src := flag.String("src", "/home/gkovalev/go/projects/src.txt", "файл-источник")
	dst := flag.String("dst", "/home/gkovalev/go/projects/ex2", "каталог назначения")
	flag.Parse()
	infile, err := os.Open(*src)
	if err != nil {
		fmt.Printf("невозможно открыть файл %s\n", *src)
	}
	defer infile.Close()
	sc := bufio.NewScanner(infile)
	var wg sync.WaitGroup
	for sc.Scan() {
		url := sc.Text()
		wg.Add(1)
		go func(url string) {
			err := download(url, *dst)
			if err != nil {
				fmt.Println(err)
			}
			wg.Done()
		}(url)
	}
	wg.Wait()
	fmt.Println(time.Since(start))
}
