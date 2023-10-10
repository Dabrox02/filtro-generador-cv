import crud from "../crud/crud.js";

const endpoint = "/programming-languages";
const interfaz = {
    "programming_language_name": "string",
    "icon": "string"
};

const programmingLanguage = crud({ endpoint, interfaz });
export default programmingLanguage;

// console.log(await programmingLanguage.getAll());
