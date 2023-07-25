package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"projects/ex6/dir"
	"time"
)

type DirMessage struct {
	Status    int
	ErrorText string
	Time      string
	Dirs      []dir.Directory
}
type Config struct {
	Port string `json:"port"`
}

// getConfig получает конфигурацию из config.json
func getConfig(path string) (Config, error) {
	var conf Config
	conf_json, err := ioutil.ReadFile(path)
	if err != nil {
		return conf, err
	}
	err = json.Unmarshal(conf_json, &conf)
	if err != nil {
		return conf, err
	}
	return conf, nil
}

// subDirs отдает json с директориями и файлами
func subDirs(w http.ResponseWriter, req *http.Request) {
	start := time.Now()
	root := req.URL.Query().Get("root")
	sort := req.URL.Query().Get("sort")
	if sort != "asc" && sort != "desc" {
		sort = "asc"
	}
	if root == "" {
		root = "/"
	}
	var res DirMessage
	var err error
	res.Dirs, err = dir.GetDirs(root)
	if err != nil {
		res.Status = 1
		res.ErrorText = "невозможно открыть " + root
	}
	dir.SortDirs(res.Dirs, sort)
	res.Time = time.Since(start).String()
	mes, err := json.Marshal(res)
	if err != nil {
		fmt.Println(err)
	}
	w.Write(mes)
}

// html отдает html-страницу клиенту
func html(w http.ResponseWriter, req *http.Request) {
	html, err := ioutil.ReadFile("/home/gkovalev/go/projects/ex6/ui.html")
	if err != nil {
		fmt.Println(err)
	}
	w.Write(html)
}

func main() {
	conf, err := getConfig("/home/gkovalev/go/projects/ex6/config.json")
	if err != nil {
		fmt.Println(err)
		return
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/subdirs", subDirs)
	mux.HandleFunc("/", html)
	fs := http.FileServer(http.Dir("/home/gkovalev/go/projects/ex6/static"))
	mux.Handle("/static/", http.StripPrefix("/static", fs))
	err = http.ListenAndServe(conf.Port, mux)
	if err != nil {
		fmt.Println(err)
	}
}
