import fs from 'fs/promises';
import path from "path";
import { __repoDirname } from '../utils.js';
import { SyntaxAnalysis } from './syntax_analysis.js';

export class LexicalAnalysis {
    static async toDivideLines() {
        let getAllCode = (await fs.readFile(path.join(__repoDirname,"./myCode.txt"))).toString();
    
        return getAllCode.split("\r\n");
    }

    static async toCreateTokens() {
        const AllLinesArray = await this.toDivideLines();
        console.log(AllLinesArray);
        for (let i = 0; i < AllLinesArray.length; i++) {
           await SyntaxAnalysis.decisionOfTokens(AllLinesArray[i], i + 1)
        }
    }
}

