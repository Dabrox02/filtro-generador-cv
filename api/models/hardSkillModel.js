import crud from "../crud/crud.js";

const endpoint = "/hard-skills";
const interfaz = {
    "hard_skill_name": "string"
};

const hardSkill = crud({ endpoint, interfaz });
export default hardSkill;

// console.log(await hardSkill.getAll());
// console.log(await hardSkill.putOne({
//     id: 1,
//     hard_skill_name: "hola"
// }));