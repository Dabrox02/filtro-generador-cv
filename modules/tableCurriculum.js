import curriculum from "../api/models/curriculumModel.js"

export const getCurriculums = async ()=>{
    return await curriculum.getAll();
}

export const delCurriculum = async (id)=>{
    let res = await curriculum.delCurriculum(id);
}