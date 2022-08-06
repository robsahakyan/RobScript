import fs from 'fs/promises';
import path from "path"
import { Compiler } from './models/compiler-model.js';

async function interpreterToJs() {
    let myInterpretedCode = await Compiler.toCompile(); 
    await fs.writeFile(path.resolve("./interpretedCode.js"), myInterpretedCode);
}

await interpreterToJs();


