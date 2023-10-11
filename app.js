import { getInitLanguagesMultiSelect, getInitProgrammingMultiSelect, getInitSoftSkillMultiSelect, getInitHardSkillMultiSelect, addContactInputs, addExperienceInputs, delInputs, formatFormData, sendDataForm } from "./modules/formCurriculum.js";

const d = document;
const $ = (e) => d.querySelector(e);
const $a = (e) => d.querySelectorAll(e);

export const app = async () => {
    document.addEventListener("click", async (e) => {
        if (e.target.matches(".btn-close-modal")) {
            e.target.closest("dialog").close();
        }
    })
    let path = window.location.pathname.split(".")[0];

    if (path === "/index") {

        const languagesSelect = await getInitLanguagesMultiSelect("#multi-select-languages");
        const programmingSelect = await getInitProgrammingMultiSelect("#multi-select-programming");
        const softSkillSelect = await getInitSoftSkillMultiSelect("#multi-select-soft-skill");
        const hardSkillSelect = await getInitHardSkillMultiSelect("#multi-select-hard-skill");

        VirtualSelect.init(languagesSelect);
        VirtualSelect.init(programmingSelect);
        VirtualSelect.init(softSkillSelect);
        VirtualSelect.init(hardSkillSelect);

        d.addEventListener("click", (e) => {

            if (e.target.matches("#btn-add-contact, #btn-add-contact *")) {
                addContactInputs({ contactsInputs: [...$a(".contact-user")], maxInputs: 5, elementHTML: $("#grid-contact-user") });
            }
            if (e.target.matches("#btn-del-contact, #btn-del-contact *")) {
                delInputs({ elementsInputs: [...$a(".contact-user")], elementHTML: $("#grid-contact-user"), dataAttribute: "ncontact" });
            }

            if (e.target.matches("#btn-add-experience, #btn-add-experience *")) {
                addExperienceInputs({ experienceInputs: [...$a(".experience-user")], maxInputs: 5, elementHTML: $("#grid-experience-user") });
            }
            if (e.target.matches("#btn-del-experience, #btn-del-experience *")) {
                delInputs({ elementsInputs: [...$a(".experience-user")], elementHTML: $("#grid-experience-user"), dataAttribute: "nexperience" });
            }
        })

        d.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (e.target.matches("#curriculum-form")) {
                console.log(Object.fromEntries(new FormData($("#curriculum-form"))));
                let formatData = formatFormData({
                    formData: Object.fromEntries(new FormData($("#curriculum-form"))),
                    selectsData: {
                        "languages_user": [...$("#multi-select-languages").value],
                        "programming_languages_user": [...$("#multi-select-programming").value],
                        "soft_skills_user": [...$("#multi-select-soft-skill").value],
                        "hard_skills_user": [...$("#multi-select-hard-skill").value]
                    }
                });
                await sendDataForm(formatData);
            }
        })
    }

    if (path === "/views/curriculums") {
        const dt = new DataTable('#table-curriculums', {
            "responsive": true, "lengthChange": true, "autoWidth": false
        });
        dt.row.add([
            "Dato 1",
            "Dato 2",
            "Dato 3",
            "Dato 4",
            "Dato 5",
        ]).draw();
    }
}