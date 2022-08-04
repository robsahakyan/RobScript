import fs from 'fs/promises';
import path from "path";
import { Memory } from '../models/memory-model.js';

export function decisionTypeOf(variable) {
    if(typeof variable === "string" && !isNaN(Number(variable))) {
        variable = Number(variable);
    } 
    switch(typeof variable) {
        case "object":
            if(Array.isArray(variable)) {
                return "array";
            }
            if(variable === null) {
                return "null";
            }
            if (variable instanceof Map) {
                return "map";
            }
            if (variable instanceof Set) {
                return "set";
            }
            return typeof variable;
        default:
            return typeof variable; 
    }
}

export async function toSeperateDeclations(line, indexOfLine) {
    let seperationWithComma = [];
    //let newArr = {}
    console.log(line);
    for (let token of line) {
        seperationWithComma.push(...token.split(","));
    }
    console.log(seperationWithComma);
    for (let i = 0; i < seperationWithComma.length; i++) {
        if (seperationWithComma[i] === "=") {
            let key = seperationWithComma[i - 1];
            let value = seperationWithComma[i + 1];
      //      console.log({key,value});
            await declarationOfVariable(line,indexOfLine, key, value)
        }
    }

}

export async function declarationOfVariable(line, indexOfLine, key, value) {
        let lineNum = indexOfLine + 1;
        let isLocal = Boolean(line[0] === "local");
        value = value.slice(0, value.indexOf(";"));
        let type = decisionTypeOf(value);

        let newVar = new Memory({line: lineNum, type, isLocal, key, value });
//console.log(newVar);
        return await newVar.save()
    //const mem = new Memory()
}