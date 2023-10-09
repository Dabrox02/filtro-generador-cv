import { Crud } from "../crud/crud.js";

export class LanguageModel extends Crud {
    constructor() {
        super("http://localhost:5010/languages");
    }

    
}

let lm = new LanguageModel();
// console.log("hola", lm);
console.log(await lm.postOne());
