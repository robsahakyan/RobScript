import fs from 'fs/promises';
import path from "path"
import { __repoDirname } from '../utils.js';

export class KeywordsModel {
    static async getAllKeywords() {
        const myKeywordsJson = (await fs.readFile(path.join(__repoDirname, "./data/myKeywords.json"))).toString();
        const myKeywords = JSON.parse(myKeywordsJson);
        const cache = new Map(Object.entries(myKeywords));

        return cache;
    }


}