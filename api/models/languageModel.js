import crud from "../crud/crud.js";

const endpoint = "/languages";
const interfaz = {
    "language_name": "string"
};

const language = crud({ endpoint, interfaz });
export default language;

// console.log(await language.getAll());
