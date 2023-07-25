//showDirs выводит директории и файлы из response
window.showDirs = (response) => {
    let divDirs = document.getElementById("dirs");
    showHeader();
    if (response.Dirs.length == 0) {
        divDirs.innerHTML = "пусто";
        window.buttonCheck();
        return;
    }
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
    window.buttonCheck();
}
//showHeader выводит кнопки возврата и сортировки
function showHeader() {
    let divHead = document.getElementById("header");
    divHead.innerHTML = "";
    let backButton = document.createElement("button")
    backButton.setAttribute("id", "back");
    backButton.appendChild(document.createTextNode("назад"));
    divHead.appendChild(backButton);
    let sortButton = document.createElement("button")
    sortButton.setAttribute("id", "sort");
    divHead.appendChild(sortButton);
    let rootText = document.createElement("button");
    rootText.appendChild(document.createTextNode(window.root));
    rootText.setAttribute("id", "roottext");
    divHead.appendChild(rootText);
}
//buttonCheck считывает нажатия на директории и кнопки возврата назад и сортировки
window.buttonCheck = () => {
    let buttons = document.getElementsByClassName("dir");
    for (let button of buttons) {
        button.addEventListener("click", () => {
            window.root = button.id;
            window.reqDirs(window.root, window.sort);
        });
    }
    let backButton = document.getElementById("back");
    backButton.addEventListener("click", () => {
        if (window.root != "/") {
            window.root = window.root.substring(0, window.root.lastIndexOf("/"));
            window.reqDirs(window.root, window.sort);
        }
    })
    let sortButton = document.getElementById("sort");
    sortButton.addEventListener("click", () => {
        if (window.sort == "asc") {
            window.sort = "desc";
        } else if (window.sort == "desc") {
            window.sort = "asc";
        }
        window.reqDirs(window.root, window.sort);
    })
}