//reqDirs получает с сервера поддиректории и файлы root, отсортированные в порядке sortType
window.reqDirs=(path,sortType) => {
    let request = new XMLHttpRequest();
    request.open('GET',`/subdirs?root=${path}&sort=${sortType}`);
    request.onloadstart=()=>{
        document.getElementById("dirs").innerHTML="загрузка...";
    }
    request.onload=() => {
    if(request.status!==200) {
        return;
    }
    let response=JSON.parse(request.response);
    if(response.Status!=0) {
    let errorText=document.createTextNode(response.ErrorText);
    divDirs.appendChild(errorText);
    }
    window.showDirs(response);
    }
    request.onerror=()=> {
    alert("error");
    }
    request.send();
}
window.sort="asc";
window.root="/";
window.reqDirs(window.root,window.sort);
