import curriculum from "../api/models/curriculumModel.js"
import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

const getCurriculums = async ()=>{
    return await curriculum.getAll();
}

export const delCurriculum = async (id)=>{
    let res = await curriculum.delOne(id);
    if(res.status){
        swalAlert({ type: "error", title: "No se pudo eliminar", time: "2000" });
    } else {
        swalAlert({ type: "success", title: "Eliminado con exito", time: "2000" });
    }
}

export const loadTable = async ({datatable})=>{
    const dtRows = await getCurriculums();
    const imgTmp = "https://img.icons8.com/?size=256&id=108652&format=png";

    dtRows.forEach((e) => {
        datatable.row
        .add([
          e.id,
          `${e.name_user} ${e.surname_user}`,
          e.title_user,
          /*html*/ `<img src="${e.photo_user ? e.photo_user : imgTmp}" alt="${
            e.name_user
          }" class="img-thumbnail photo_user">`,
          /*html*/ `
            <div class="row justify-content-center">
                <div class="p-1">
                    <button id="btn-show-curriculum" class="btn btn-outline-primary" type="button" data-show="${e.id}">Ver</button>
                </div>
                <div class="p-1">
                    <button id="btn-edit-curriculum" class="btn btn-outline-warning" type="button" data-edit="${e.id}">Editar</button>
                </div>
                <div class="p-1">
                    <button id="btn-del-curriculum" class="btn btn-outline-danger" type="button" data-del="${e.id}">Eliminar</button>
                </div>
            </div>`,
        ])
        .draw();
    });
}

