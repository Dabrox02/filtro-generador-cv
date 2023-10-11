import language from "../api/models/languageModel.js"
import programmingLanguage from "../api/models/programmingLanguageModel.js"
import softSkill from "../api/models/softSkillModel.js"
import hardSkill from "../api/models/hardSkillModel.js"
import curriculum from "../api/models/curriculumModel.js"
import { swalAlert } from "../components/swal-alert/swal-alert-component.js"

const d = document;
const $ = (e) => d.querySelector(e);
const $a = (e) => d.querySelectorAll(e);

// LOAD CONFIG 
const configMultiSelect = (ele, options, placeholder, selectedValues) => {
  return {
    ele,
    options,
    multiple: true,
    maxWidth: "100%",
    placeholder,
    searchPlaceholderText: "Buscar",
    optionsSelectedText: "Opciones Seleccionadas",
    noOptionsText: "No se encontraron opciones",
    noSearchResultsTex: "No encontrado",
    optionSelectedText: "opcion seleccionada",
    allOptionsSelectedText: "Todos",
    selectedValue: [...selectedValues]
  }
}

const optionsLanguageMultiSelect = async () => {
  return [...await language.getAll()].map((e) => {
    return { "value": e.id, "label": e.language_name.charAt(0).toUpperCase() + e.language_name.slice(1) }
  });
}

const optionsProgrammingMultiSelect = async () => {
  return [...await programmingLanguage.getAll()].map((e) => {
    return { "value": e.id, "label": e.programming_language_name.charAt(0).toUpperCase() + e.programming_language_name.slice(1) }
  });
}

const optionsSoftSkillMultiSelect = async () => {
  return [...await softSkill.getAll()].map((e) => {
    return { "value": e.id, "label": e.soft_skill_name.charAt(0).toUpperCase() + e.soft_skill_name.slice(1) }
  });
}

const optionsHardSkillMultiSelect = async () => {
  return [...await hardSkill.getAll()].map((e) => {
    return { "value": e.id, "label": e.hard_skill_name.charAt(0).toUpperCase() + e.hard_skill_name.slice(1) }
  });
}

export const getInitLanguagesMultiSelect = async (ele, selectedValues = []) => {
  return configMultiSelect(ele, await optionsLanguageMultiSelect(), "Seleccione los idiomas que maneja.", selectedValues);
}

export const getInitProgrammingMultiSelect = async (ele, selectedValues = []) => {
  return configMultiSelect(ele, await optionsProgrammingMultiSelect(), "Seleccione los lenguajes de programacion que maneja.", selectedValues);
}

export const getInitSoftSkillMultiSelect = async (ele, selectedValues = []) => {
  return configMultiSelect(ele, await optionsSoftSkillMultiSelect(), "Seleccione las habilidades blandas que posee.", selectedValues);
}

export const getInitHardSkillMultiSelect = async (ele, selectedValues = []) => {
  return configMultiSelect(ele, await optionsHardSkillMultiSelect(), "Seleccione las habilidades tecnicas que posee.", selectedValues);
}


// ADD - DELETE INPUTS FORM
export const addContactInputs = ({ contactsInputs, maxInputs, elementHTML }) => {
  if (elementHTML) {
    if (contactsInputs.length < maxInputs) {
      elementHTML.insertAdjacentHTML("beforeend",  /*html*/`
        <div class="col-12 contact-user" data-ncontact="${contactsInputs.length + 1}">
           <div class="form-group row">
             <div class="col-md-6 col-sm-12">
               <input name="name_contact_user_${contactsInputs.length + 1}" type="text" class="form-control"
                 id="nameContactInput${contactsInputs.length + 1}" aria-describedby="nameSocialNetHelp"
                 placeholder="Nombre Red Social.">
               <small id="nameSocialNetHelp" class="form-text text-muted">e.g Instagram</small>
             </div>
             <div class="col-md-6 col-sm-12">
               <input name="contact_form_user_${contactsInputs.length + 1}" type="text" class="form-control" id="contactFormInput${contactsInputs.length + 1}"
                 aria-describedby="contactFormInputHelp" placeholder="Ingresa tu contacto.">
               <small id="contactFormInputHelp" class="form-text text-muted">e.g
                 http://www.linkedin.com</small>
             </div>
           </div>
         </div>`)
    }
  }
}

export const addExperienceInputs = ({ experienceInputs, maxInputs, elementHTML }) => {
  if (elementHTML) {
    if (experienceInputs.length < maxInputs) {
      elementHTML.insertAdjacentHTML("beforeend",  /*html*/`
        <div class="col-12 experience-user" data-nexperience="${experienceInputs.length + 1}">
            <div class="form-group row">
              <div class="col-md-6 col-sm-12">
                <input name="position_experience_${experienceInputs.length + 1}" type="text" class="form-control"
                  id="positionExperienceInput${experienceInputs.length + 1}" aria-describedby="positionCompanyHelp"
                  placeholder="Posicion que ocupaste en la compañia.">
                <small id="positionCompanyHelp" class="form-text text-muted">e.g Desarrollador
                  web...</small>
              </div>
              <div class="col-md-6 col-sm-12">
                <input name="laboral_experience_${experienceInputs.length + 1}" type="text" class="form-control"
                  id="laboralExperienceInput${experienceInputs.length + 1}" aria-describedby="nameSocialNetHelp"
                  placeholder="Cuenta tu experiencia laboral.">
                <small id="nameSocialNetHelp" class="form-text text-muted">e.g Apoyo tecnico al ciclo
                  del proyecto...</small>
              </div>
            </div>
          </div>`)
    }
  }
}

export const delInputs = ({ elementsInputs, elementHTML, dataAttribute }) => {
  if (elementHTML) {
    if (elementsInputs.length > 1) {
      let elementDelete = $(`[data-${dataAttribute}="${elementsInputs.length}"]`)
      elementHTML.removeChild(elementDelete);
    }
  }
}

// FORMAT DATA
export const formatFormData = ({ formData, selectsData }) => {
  let name_contact_user = Object.entries(formData).filter((e) => e[0].startsWith("name_contact_user_")).map((e) => (e[1]) ? { name_contact_user: e[1] } : {});
  let contact_form_user = Object.entries(formData).filter((e) => e[0].startsWith("contact_form_user_")).map((e) => (e[1]) ? { contact_form_user: e[1] } : {});
  let contact_user = name_contact_user.map((val, index) => {
    if (Object.entries(val).length !== 0 && Object.entries(contact_form_user[index]).length !== 0) return { ...val, ...contact_form_user[index] }
  }).filter((e) => e !== undefined)

  let position_experience = Object.entries(formData).filter((e) => e[0].startsWith("position_experience_")).map((e) => (e[1]) ? { position_experience: e[1] } : {});
  let laboral_experience = Object.entries(formData).filter((e) => e[0].startsWith("laboral_experience_")).map((e) => (e[1]) ? { laboral_experience: e[1] } : {});
  let laboral_experience_user = position_experience.map((val, index) => {
    if (Object.entries(val).length !== 0 && Object.entries(laboral_experience[index]).length !== 0) return { ...val, ...laboral_experience[index] }
  }).filter((e) => e !== undefined)

  const obj = {
    "name_user": delSpecialChars(formData.name_user).trim(),
    "surname_user": delSpecialChars(formData.surname_user).trim(),
    "description_user": delSpecialChars(formData.description_user).trim(),
    "photo_user": isURL(formData.photo_user) ? formData.photo_user : "",
    "title_user": delSpecialChars(formData.title_user).trim(),
    "contact_user": [...contact_user],
    "laboral_experience_user": [...laboral_experience_user],
    "languages_user": [...selectsData.languages_user.map((e) => Number(e)).filter((e) => !isNaN(e))],
    "soft_skills_user": [...selectsData.soft_skills_user.map((e) => Number(e)).filter((e) => !isNaN(e))],
    "hard_skills_user": [...selectsData.hard_skills_user.map((e) => Number(e)).filter((e) => !isNaN(e))],
    "programming_languages_user": [...selectsData.programming_languages_user.map((e) => Number(e)).filter((e) => !isNaN(e))]
  }
  return obj;
}

export const loadEditForm = ({ formData }) => {
  $("#nameInput").value = formData.name_user;
  $("#surnameInput").value = formData.surname_user;
  $("#photoInput").value = formData.photo_user;
  $("#titleInput").value = formData.title_user;
  $("#descriptionInput").value = formData.description_user;
  if (formData.contact_user.length !== 0) {
    $("#nameContactInput1").value = formData.contact_user[0].name_contact_user;
    $("#urlContactInput1").value = formData.contact_user[0].contact_form_user;
    if (formData.contact_user.length > 1) {
      for (const [index, value] of Object.entries(formData.contact_user).slice(1, 5)) {
        $(`#grid-contact-user`).insertAdjacentHTML("beforeend",  /*html*/`
                <div class="col-12 contact-user" data-ncontact="${Number(index) + 1}">
                   <div class="form-group row">
                     <div class="col-md-6 col-sm-12">
                       <input name="name_contact_user_${Number(index) + 1}" type="text" class="form-control"
                         id="nameContactInput${Number(index) + 1}" aria-describedby="nameSocialNetHelp"
                         placeholder="Nombre Red Social." value="${value.name_contact_user}">
                       <small id="nameSocialNetHelp" class="form-text text-muted">e.g Instagram</small>
                     </div>
                     <div class="col-md-6 col-sm-12">
                       <input name="contact_form_user_${Number(index) + 1}" type="text" class="form-control" id="contactFormInput${Number(index) + 1}"
                         aria-describedby="contactFormInputHelp" placeholder="Ingresa tu contacto." value="${value.contact_form_user}">
                       <small id="contactFormInputHelp" class="form-text text-muted">e.g
                         http://www.linkedin.com</small>
                     </div>
                   </div>
                 </div>`)
      }
    }
  }

  if (formData.laboral_experience_user.length !== 0) {
    $("#positionExperienceInput1").value = formData.laboral_experience_user[0].position_experience;
    $("#laboralExperienceInput1").value = formData.laboral_experience_user[0].laboral_experience;
    if (formData.contact_user.length > 1) {
      for (const [index, value] of Object.entries(formData.contact_user).slice(1, 5)) {
        $(`#grid-experience-user`).insertAdjacentHTML("beforeend",  /*html*/`
                <div class="col-12 experience-user" data-nexperience="${Number(index) + 1}">
                    <div class="form-group row">
                      <div class="col-md-6 col-sm-12">
                        <input name="position_experience_${Number(index) + 1}" type="text" class="form-control"
                          id="positionExperienceInput${Number(index) + 1}" aria-describedby="positionCompanyHelp"
                          placeholder="Posicion que ocupaste en la compañia." value="${value.position_experience}">
                        <small id="positionCompanyHelp" class="form-text text-muted">e.g Desarrollador
                          web...</small>
                      </div>
                      <div class="col-md-6 col-sm-12">
                        <input name="laboral_experience_${Number(index) + 1}" type="text" class="form-control"
                          id="laboralExperienceInput${Number(index) + 1}" aria-describedby="nameSocialNetHelp"
                          placeholder="Cuenta tu experiencia laboral." value="${value.laboral_experience}">
                        <small id="nameSocialNetHelp" class="form-text text-muted">e.g Apoyo tecnico al ciclo
                          del proyecto...</small>
                      </div>
                    </div>
                  </div>`)
      }
    }
  }
}

const crearMultiSelect = (idDiv, idInp) => {
  return /*html*/`
    <div id="${idDiv}">
        <select id="${idInp}" multiple name="native-select" data-search="false">
        </select>
    </div>
    `
}

export const cleanMultiSelect = (idDiv, idInp, target) => {
  if ($(`#${idDiv}`)) $(`#${idDiv}`).remove();
  $(`#${target}`).insertAdjacentHTML("beforeend", crearMultiSelect(idDiv, idInp));
}

export const sendDataForm = async (obj) => {
  let res = await curriculum.postOne(obj);
  if (res.status) {
    swalAlert({ type: "error", title: "No se pudo guardar", time: "2000" });
  } else {
    swalAlert({ type: "success", title: "Agregado con exito", time: "2000" });
  }
}

export const editDataForm = async (obj) => {
  let res = await curriculum.putOne(obj);
  if (res.status) {
    swalAlert({ type: "error", title: "No se pudo editar", time: "2000" });
  } else {
    swalAlert({ type: "success", title: "Editado con exito", time: "2000" });
  }
}

const delSpecialChars = (texto) => {
  return texto.replace(/[\/\\><~^]/g, "");
}

const isURL = (url) => {
  var regex = /^(https?|https):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
}