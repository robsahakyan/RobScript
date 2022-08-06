import fs from 'fs/promises';
import path from "path";
import { LexicalAnalysis } from '../compilerStages/lexical_analysis.js';
import { toSeperateDeclations } from '../data/structureOfLanguage.js';
import { __repoDirname } from '../utils.js';
import { KeywordsModel } from './keyword-model.js';


export class Compiler {
    static async toCompile() {
       
        let tokenizedLines = await LexicalAnalysis.toDivideLines();
        LexicalAnalysis.toCreateTokens();
        let keywords = await KeywordsModel.getAllKeywords();

        for (let i = 0; i < tokenizedLines.length; i++) {
            let line = tokenizedLines[i].split(" ");

            for (let j = 0; j < line.length; j++) {
                if (keywords.has(line[j])) {
                    line[j] = keywords.get(line[j]);
                }
            }
            tokenizedLines[i] = line.join(" ").trim();
        }

        return tokenizedLines.join("\r\n");
    }
}