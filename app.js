import {
  getInitLanguagesMultiSelect,
  getInitProgrammingMultiSelect,
  getInitSoftSkillMultiSelect,
  getInitHardSkillMultiSelect,
  addContactInputs,
  addExperienceInputs,
  delInputs,
  formatFormData,
  sendDataForm,
} from "./modules/formCurriculum.js";
import { getCurriculums } from "./modules/tableCurriculum.js";

const d = document;
const $ = (e) => d.querySelector(e);
const $a = (e) => d.querySelectorAll(e);

export const app = async () => {
  document.addEventListener("click", async (e) => {
    if (e.target.matches(".btn-close-modal")) {
      e.target.closest("dialog").close();
    }
  });
  let path = window.location.pathname.split(".")[0];

  if (path === "/index") {
    const languagesSelect = await getInitLanguagesMultiSelect(
      "#multi-select-languages"
    );
    const programmingSelect = await getInitProgrammingMultiSelect(
      "#multi-select-programming"
    );
    const softSkillSelect = await getInitSoftSkillMultiSelect(
      "#multi-select-soft-skill"
    );
    const hardSkillSelect = await getInitHardSkillMultiSelect(
      "#multi-select-hard-skill"
    );

    VirtualSelect.init(languagesSelect);
    VirtualSelect.init(programmingSelect);
    VirtualSelect.init(softSkillSelect);
    VirtualSelect.init(hardSkillSelect);

    d.addEventListener("click", (e) => {
      if (e.target.matches("#btn-add-contact, #btn-add-contact *")) {
        addContactInputs({
          contactsInputs: [...$a(".contact-user")],
          maxInputs: 5,
          elementHTML: $("#grid-contact-user"),
        });
      }
      if (e.target.matches("#btn-del-contact, #btn-del-contact *")) {
        delInputs({
          elementsInputs: [...$a(".contact-user")],
          elementHTML: $("#grid-contact-user"),
          dataAttribute: "ncontact",
        });
      }

      if (e.target.matches("#btn-add-experience, #btn-add-experience *")) {
        addExperienceInputs({
          experienceInputs: [...$a(".experience-user")],
          maxInputs: 5,
          elementHTML: $("#grid-experience-user"),
        });
      }
      if (e.target.matches("#btn-del-experience, #btn-del-experience *")) {
        delInputs({
          elementsInputs: [...$a(".experience-user")],
          elementHTML: $("#grid-experience-user"),
          dataAttribute: "nexperience",
        });
      }
    });

    d.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.target.matches("#curriculum-form")) {
        // console.log(Object.fromEntries(new FormData()));
        let formatData = formatFormData({
          formData: Object.fromEntries(new FormData($("#curriculum-form"))),
          selectsData: {
            languages_user: [...$("#multi-select-languages").value],
            programming_languages_user: [
              ...$("#multi-select-programming").value,
            ],
            soft_skills_user: [...$("#multi-select-soft-skill").value],
            hard_skills_user: [...$("#multi-select-hard-skill").value],
          },
        });
        await sendDataForm(formatData);
        $("#curriculum-form").reset();
      }
    });
  }

  if (path === "/views/curriculums") {
    const dt = new DataTable("#table-curriculums", {
      responsive: true,
      lengthChange: true,
      autoWidth: false,
    });
    const dtRows = await getCurriculums();
    const imgTmp = "https://img.icons8.com/?size=256&id=108652&format=png";
    console.log(await getCurriculums());
    dtRows.forEach((e) => {
      dt.row
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
                    <button id="btn-edit-curriculum" class="btn btn-primary" type="button" data-edit="${e.id}">Editar</button>
                </div>
                <div class="p-1">
                    <button id="btn-del-curriculum" class="btn btn-danger" type="button" data-del="${e.id}">Eliminar</button>
                </div>
            </div>`,
        ])
        .draw();
    });
  }
};
