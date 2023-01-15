//@ts-ignore
import { appendFile } from "fs";

let FILE_NAME: string;
export function setFileName(name: string) {
    FILE_NAME = name;
}

export function print(text: string) {
    console.log(text);
    appendFile(FILE_NAME, `${text}\n`, (err) => {

        // In case of a error throw err.
        if (err) throw err;
    });
}