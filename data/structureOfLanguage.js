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

    for (let token of line) {
        seperationWithComma.push(...token.split(","));
    }

    for (let i = 0; i < seperationWithComma.length; i++) {
        if (seperationWithComma[i] === "=") {
            let key = seperationWithComma[i - 1];
            let value = seperationWithComma[i + 1];

            await declarationOfVariable(line,indexOfLine, key, value)
        }
    }
}