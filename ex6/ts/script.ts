import reqDirs from "./request";
import showDirs from "./view";
declare global {
    var sort:string;
    var root:string;
}
let sort = "asc";
let root = "/";
reqDirs(root,sort,showDirs);