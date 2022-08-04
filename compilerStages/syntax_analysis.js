import fs from 'fs/promises';
import path from "path";
import { SyntaxError } from '../errorHandling/syntax-error.js';
import { __repoDirname } from '../utils.js';

export class SyntaxAnalysis {
    static async decisionOfTokens(line,numLine) {
        const declarationRegExp = new RegExp("^\s*(local|global)");
       
        if (declarationRegExp.test(line)) {
            this.toManufactureDeclarations(line,numLine);
        } else {
            console.log(false);
        }
    }

    static toManufactureDeclarations(line,numLine) {
        const declarationRegExp = /"^\s*(local|global)/g;
        const createVariableWithRulesRegExp = /\s*[A-Z]*[a-z]*[0-9]*\s*[=]\s*/g;
       
        const scopeOfVariable = line.match(declarationRegExp)[0];
        
        line = line.replace(scopeOfVariable,"");
        
        let flag = true;
        let i = 0;
        while(flag) {
            const validationOfVar = createVariableWithRulesRegExp.exec(line);
            console.log(validationOfVar);

            
            if (!validationOfVar && !i) {
                throw new SyntaxError("Rob does not supported this syntax in declaration")
            } else if(!validationOfVar && i) {
                break;
            }
             
            i++;
            const varName = validationOfVar[0].trim().split(" ")[0];
            console.log(varName,444);
            line = line.replace(validationOfVar[0],"");
            this.toCheckTypeOfVariable(line)
            console.log(line);
        }
       
        
        
    }
    static toCheckTypeOfVariable(line) {
        const stringVariableRegExp = /^["']*.*["'][;,]*/g;

        

    }
}