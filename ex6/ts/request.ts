import { DirResponse } from "./types";
//reqDirs получает с сервера поддиректории и файлы root, отсортированные в порядке sortType
export default function reqDirs (path:string,sortType:string,handler:Function) {
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
                return;
            }
            handler(response);
            }
            request.onerror = () => {
                alert("error");
            }
            request.send();
    }





   
    
    
