import fs from 'fs/promises';
import path from "path";
import { __repoDirname } from '../utils.js';

export class Memory {
    constructor({line, type, isLocal, key, value}) {
        this.line = line;
        this.isLocal = isLocal;
        this.type = type;
        this.key = key;
        this.value = value;
    }

    async save() {
        const mem = (await fs.readFile(path.join(__repoDirname, "./RAM.json"))).toString();
        const toParseMem = JSON.parse(mem);

        toParseMem.push(this);
        
        return await fs.writeFile(path.join(__repoDirname, "./RAM.json"), JSON.stringify(toParseMem))
    }
}