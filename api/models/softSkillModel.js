import crud from "../crud/crud.js";

const endpoint = "/soft-skills";
const interfaz = {
    "soft_skill_name": "string"
};

const softSkill = crud({ endpoint, interfaz });
export default softSkill;

// console.log(await softSkill.getAll());

