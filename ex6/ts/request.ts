import { showDirs, buttonCheck } from "./view";
export type Directory = {
    Path:string;
    Name:string;
    Size:number;
    Type:string;
}
export type DirResponse = {
    Status:number;
    ErrorText:string;
    Time:string;
    Dirs:Directory[];
}
//reqDirs получает с сервера поддиректории и файлы root, отсортированные в порядке sortType
export function reqDirs (path:string,sortType:string) {
    let request = new XMLHttpRequest();
    request.open('GET',`/subdirs?root=${path}&sort=${sortType}`);
    request.onloadstart = () => {
        let divDirs = document.getElementById("dirs");
        if (divDirs!=null) {
            divDirs.innerHTML = "загрузка...";
        }
    }
    request.onload=() => {
    if(request.status !== 200) {
        return;
    }
    let response:DirResponse;
    response = JSON.parse(request.response);
    if(response.Status == 1) {
        let divDirs = document.getElementById("dirs");
        if (divDirs!=null) {
            divDirs.innerHTML = response.ErrorText;
        }
        buttonCheck();
        return;
    }
    showDirs(response);
    }
    request.onerror = () => {
        alert("error");
    }
    request.send();
}
