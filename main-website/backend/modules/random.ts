import {from} from "rxjs";

export function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
}

export function getRandomSmallLetter(){
    const firstCharCode = "a".charCodeAt(0);
    return String.fromCharCode(firstCharCode + getRandomInt(26));
}

export function getRandomStringWithSmallLetters(length: number){
    let result : string = '';
    for (let i : number = 0; i < length; i ++){
        result += getRandomSmallLetter();
    }
    return result;
}