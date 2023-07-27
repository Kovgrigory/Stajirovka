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