import fs from 'fs/promises';
import path from "path";
import { SyntaxError } from '../errorHandling/syntax-error.js';
import { Memory } from '../models/memory-model.js';
import { __repoDirname } from '../utils.js';

export class SyntaxAnalysis {
    static async decisionOfTokens(line,numLine) {
        const declarationRegExp = new RegExp("^\s*(local|global)");
       
        if (declarationRegExp.test(line)) {
           await this.toManufactureDeclarations(line,numLine);
        } else {
            console.log(false);
        }
    }

    static async toManufactureDeclarations(line,numLine) {
        const declarationRegExp = /^\s*(local|global)/g;
        const createVariableWithRulesRegExp = /\s*[A-Z]*[a-z]*[0-9]*\s*[=]\s*/g;
        const scopeOfVariable = line.match(declarationRegExp)[0];
        
        line = line.replace(scopeOfVariable,"");
        
        const isLocal = Boolean(scopeOfVariable === "local");
        let flag = true;
        let i = 0;
        let value;
        let type;
        
        while (flag) {
            const validationOfVar = createVariableWithRulesRegExp.exec(line);
            
            if (!validationOfVar && !i) {
                throw new SyntaxError("Rob does not supported this syntax in declaration")
            } else if(!validationOfVar && i) {
                break;
            }
             
            i++;

            const key = validationOfVar[0].trim().split(" ")[0];
            line = line.replace(validationOfVar[0],"");
           
            if (this.toCheckTypeOfVariable(line)) {
                value = this.toCheckTypeOfVariable(line).value;
                type = this.toCheckTypeOfVariable(line).type;
            }
            line = line.replace(this.toCheckTypeOfVariable(line).value,""); 
            const newVar = new Memory({line: numLine, isLocal, type, key, value});

            await newVar.save();
        }
    }
    
    static toCheckTypeOfVariable(line) {
        const stringVariableRegExp = /^[']*.*['][^;,]*/g;
        const numberVariableRegExp = /^\s*[\d][^;,]*/g;
        const getVariableIfString = line.match(stringVariableRegExp);
        const getOtherVariables = line.match(numberVariableRegExp);

        if (getVariableIfString) {
            return { value: stringVariableRegExp.exec(line)[0], type: "string" }
        }
        else if (getOtherVariables) {
            return { value: numberVariableRegExp.exec(line)[0], type: "number" }
        }

        throw new SyntaxError("kam chka type-y der kamel chi lini")
    }
}