import { DirResponse } from "./types";
import reqDirs from "./request";
let root="/";
let sort="asc";
//showDirs выводит директории и файлы из response
export default function showDirs (response:DirResponse) {
    let divDirs = document.getElementById("dirs");
    showHeader();
    if (response.Dirs.length == 0) {
        if(divDirs!=null) {
            divDirs.innerHTML = "пусто";
        }
        buttonCheck();
        return;
    }
    if(divDirs!=null) {
        divDirs.innerHTML = "";
        for (let dir of response.Dirs) {
            let dirElem = document.createElement("button");
            dirElem.setAttribute("id", `${dir.Path}/${dir.Name}`);
            dirElem.setAttribute("class", dir.Type);
            let dirText = document.createTextNode(` ${dir.Name} | ${dir.Size.toFixed(3)} мб`);
            dirElem.appendChild(dirText);
            divDirs.appendChild(dirElem);
            let br = document.createElement("br");
            divDirs.appendChild(br);
        }
        let timeElem = document.createElement("p");
        timeElem.setAttribute("id", "timetext");
        timeElem.appendChild(document.createTextNode("время подсчета: " + response.Time));
        divDirs.appendChild(timeElem);
    }
    buttonCheck();
}
//showHeader выводит кнопки возврата и сортировки
function showHeader() {
    let divHead = document.getElementById("header");
    if(divHead!=null) {
        divHead.innerHTML = "";
        let backButton = document.createElement("button")
        backButton.setAttribute("id", "back");
        backButton.appendChild(document.createTextNode("назад"));
        divHead.appendChild(backButton);
        let sortButton = document.createElement("button")
        sortButton.setAttribute("id", "sort");
        divHead.appendChild(sortButton);
        let rootText = document.createElement("button");
        rootText.appendChild(document.createTextNode(root));
        rootText.setAttribute("id", "roottext");
        divHead.appendChild(rootText);
    }
}
//buttonCheck считывает нажатия на директории и кнопки возврата назад и сортировки
function buttonCheck() {
    let buttons = document.getElementsByClassName("dir");
    for (let i=0;i<buttons.length;i++) {
        let button=buttons[i];
        button.addEventListener("click", () => {
            root = button.id;
            reqDirs(root, sort,showDirs);
        });
    }
    let backButton = document.getElementById("back");
    if(backButton!=null) {
        backButton.addEventListener("click", () => {
            if (root != "/") {
                root = root.substring(0, root.lastIndexOf("/"));
                reqDirs(root, sort,showDirs);
            }
        })
    }
    let sortButton = document.getElementById("sort");
    if(sortButton!=null) {
        sortButton.addEventListener("click", () => {
            if (sort == "asc") {
                sort = "desc";
            } else if (sort == "desc") {
                sort = "asc";
            }
            reqDirs(root, sort,showDirs);
        })
    }
}