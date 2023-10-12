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
  editDataForm,
  loadEditForm,
  cleanMultiSelect
} from "./modules/formCurriculum.js";
import { loadTable, editCurriculum, delCurriculum } from "./modules/tableCurriculum.js";
import { createCurriculum } from "./modules/viewCurriculum.js";

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
    d.addEventListener("click", async (e) => {
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

      if (e.target.matches("#btn-collapse-form-curriculum")) {
        $("#curriculum-form").reset();
        for (let index = 0; index < 4; index++) {
          delInputs({
            elementsInputs: [...$a(".contact-user")],
            elementHTML: $("#grid-contact-user"),
            dataAttribute: "ncontact",
          });
        }
        $("#title-card").textContent = "Crear Curriculum";
        $("#sendData").textContent = "Crear Curriculum";
        $("#curriculum-form").dataset.action = "save";
        $("#curriculum-form").removeAttribute("data-edit");
        let languagesSelect = await getInitLanguagesMultiSelect(
          "#multi-select-languages"
        );
        let programmingSelect = await getInitProgrammingMultiSelect(
          "#multi-select-programming"
        );
        let softSkillSelect = await getInitSoftSkillMultiSelect(
          "#multi-select-soft-skill"
        );
        let hardSkillSelect = await getInitHardSkillMultiSelect(
          "#multi-select-hard-skill"
        );
        cleanMultiSelect("multi-select-languages", "languageInput", "select-languages");
        cleanMultiSelect("multi-select-programming", "programmingInput", "select-programming");
        cleanMultiSelect("multi-select-soft-skill", "softSkillInput", "select-soft-skill");
        cleanMultiSelect("multi-select-hard-skill", "hardSkillInput", "select-hard-skill");
        VirtualSelect.init(languagesSelect);
        VirtualSelect.init(programmingSelect);
        VirtualSelect.init(softSkillSelect);
        VirtualSelect.init(hardSkillSelect);
      }

      if (e.target.matches("#btn-show-curriculum")) {
        await createCurriculum(Number(e.target.dataset.show));
      }

      if (e.target.matches("#btn-edit-curriculum")) {
        for (let index = 0; index < 4; index++) {
          delInputs({
            elementsInputs: [...$a(".contact-user")],
            elementHTML: $("#grid-contact-user"),
            dataAttribute: "ncontact",
          });
        }
        $("#title-card").textContent = "Editar Curriculum";
        $("#sendData").textContent = "Editar Curriculum";
        $("#curriculum-form").dataset.action = "edit";
        $("#curriculum-form").dataset.edit = e.target.dataset.edit;
        let formData = await editCurriculum({
          id: e.target.dataset.edit
        });
        loadEditForm({ formData });
        let editLanguagesSelect = await getInitLanguagesMultiSelect(
          "#multi-select-languages", formData.languages_user
        );
        let editProgrammingSelect = await getInitProgrammingMultiSelect(
          "#multi-select-programming", formData.programming_languages_user
        );
        let editSoftSkillSelect = await getInitSoftSkillMultiSelect(
          "#multi-select-soft-skill", formData.soft_skills_user
        );
        let editHardSkillSelect = await getInitHardSkillMultiSelect(
          "#multi-select-hard-skill", formData.hard_skills_user
        );
        cleanMultiSelect("multi-select-languages", "languageInput", "select-languages");
        cleanMultiSelect("multi-select-programming", "programmingInput", "select-programming");
        cleanMultiSelect("multi-select-soft-skill", "softSkillInput", "select-soft-skill");
        cleanMultiSelect("multi-select-hard-skill", "hardSkillInput", "select-hard-skill");
        VirtualSelect.init(editLanguagesSelect);
        VirtualSelect.init(editProgrammingSelect);
        VirtualSelect.init(editSoftSkillSelect);
        VirtualSelect.init(editHardSkillSelect);
      }

      if (e.target.matches("#btn-del-curriculum")) {
        await delCurriculum(Number(e.target.dataset.del))
      }

      if (e.target.matches("#printCurriculumPNG")) {
        const elementTarget = $("#main-curriculum");
        html2canvas(elementTarget)
          .then(canvas => {
            let enlace = document.createElement('a');
            enlace.download = "curriculum.png";
            enlace.href = canvas.toDataURL();
            enlace.click();
          });
      }

      if (e.target.matches("#printCurriculumPDF")) {
        const elementTarget = $("#main-curriculum");
        html2pdf()
          .set({
            margin: 1,
            filename: 'curriculum.pdf',
            image: {
              type: 'jpeg',
              quality: 0.98
            },
            html2canvas: {
              scale: 3,
              letterRendering: true,
            },
            jsPDF: {
              unit: "in",
              format: "a3",
              orientation: 'portrait'
            }
          })
          .from(elementTarget)
          .save()
          .catch(err => console.log(err));
      }

    });

    d.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.target.matches("#curriculum-form[data-action='save']")) {
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

      if (e.target.matches("#curriculum-form[data-action='edit']")) {
        let formatData = {
          ...formatFormData({
            formData: Object.fromEntries(new FormData($("#curriculum-form"))),
            selectsData: {
              languages_user: [...$("#multi-select-languages").value],
              programming_languages_user: [
                ...$("#multi-select-programming").value,
              ],
              soft_skills_user: [...$("#multi-select-soft-skill").value],
              hard_skills_user: [...$("#multi-select-hard-skill").value],
            },
          }), id: Number(e.target.dataset.edit)
        };
        await editDataForm(formatData);
        $("#curriculum-form").reset();
      }
    });

    const dt = new DataTable("#table-curriculums", {
      responsive: true,
      lengthChange: true,
      autoWidth: false,
    });
    await loadTable({ datatable: dt });

  }
};
