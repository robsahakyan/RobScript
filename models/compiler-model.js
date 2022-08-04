import { LexicalAnalysis } from '../compilerStages/lexical_analysis.js';
import { __repoDirname } from '../utils.js';
import { KeywordsModel } from './keyword-model.js';


export class Compiler {
    static async toCompile() {
        let tokenizedLines = await LexicalAnalysis.toDivideLines();
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
}