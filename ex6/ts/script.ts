import { reqDirs } from "./request";
declare global {
    var sort:string;
    var root:string;
}
sort = "asc";
root = "/";
reqDirs(root,sort);