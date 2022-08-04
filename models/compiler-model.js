import fs from 'fs/promises';
import path from "path";
import { toSeperateDeclations } from '../data/structureOfLanguage.js';
import { __repoDirname } from '../utils.js';
import { KeywordsModel } from './keyword-model.js';


export class Compiler {
    static async toCompile() {
        let tokenizedLines = await this.createLineTokens();
        let keywords = await KeywordsModel.getAllKeywords();

        for (let i = 0; i < tokenizedLines.length; i++) {
            let line = tokenizedLines[i];

            for (let j = 0; j < line.length; j++) {
                if (keywords.has(line[j])) {
                    line[j] = keywords.get(line[j]);
                }
            }
            tokenizedLines[i] = line.join(" ");
        }

        return tokenizedLines.join("\r\n");
    }

    // static async toDivideLines() {
    //     let getAllCode = (await fs.readFile(path.join(__repoDirname,"./myCode.txt"))).toString();

    //     return getAllCode.split("\r\n");
    // }

    // static async createLinesTokens() {
    //     let linesOfCode = await this.toDivideLines();
    //     console.log(linesOfCode,1);
    //     // for(let i = 0; i < linesOfCode.length; i++) {
    //     //     linesOfCode[i] = linesOfCode[i].split(" ");
    //     // }
    //     console.log(linesOfCode,2);
    //     return linesOfCode;
    // }
}