package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

func download(url, dst string) error { //отправляет запрос на адрес url, записывает ответ в новый файл в каталоге dst
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
	dst := flag.String("dst", "/home/gkovalev/go/projects/ex1", "каталог назначения")
	flag.Parse()
	infile, err := os.Open(*src)
	if err != nil {
		fmt.Printf("невозможно открыть файл %s\n", *src)
	}
	defer infile.Close()
	sc := bufio.NewScanner(infile)
	for sc.Scan() {
		err := download(sc.Text(), *dst)
		if err != nil {
			fmt.Println(err)
		}
	}
	fmt.Println(time.Since(start))
}
