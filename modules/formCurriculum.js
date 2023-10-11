import language from "../api/models/languageModel.js"
import programmingLanguage from "../api/models/programmingLanguageModel.js"
import softSkill from "../api/models/softSkillModel.js"
import hardSkill from "../api/models/hardSkillModel.js"

// LOAD CONFIG 
const configMultiSelect = (ele, options, placeholder) => {
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
        selectedValue: []
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

export const getInitLanguagesMultiSelect = async (ele) => {
    return configMultiSelect(ele, await optionsLanguageMultiSelect(), "Seleccione los idiomas que maneja.");
}

export const getInitProgrammingMultiSelect = async (ele) => {
    return configMultiSelect(ele, await optionsProgrammingMultiSelect(), "Seleccione los lenguajes de programacion que maneja.");
}

export const getInitSoftSkillMultiSelect = async (ele) => {
    return configMultiSelect(ele, await optionsSoftSkillMultiSelect(), "Seleccione las habilidades blandas que posee.");
}

export const getInitHardSkillMultiSelect = async (ele) => {
    return configMultiSelect(ele, await optionsHardSkillMultiSelect(), "Seleccione las habilidades tecnicas que posee.");
}


// ADD - DELETE INPUTS FORM
export const addContactInputs = ({ contactsInputs, maxInputs, elementHTML }) => {
    if (elementHTML) {
        console.log(elementHTML);
        if (contactsInputs.length < maxInputs) {
            elementHTML.insertAdjacentHTML("beforeend",  /*html*/`
        <div class="col-12 contact-user" data-ncontact="${contactsInputs.length + 1}">
           <div class="form-group row">
             <div class="col-md-6 col-sm-12">
               <input name="name_contacto_user_${contactsInputs.length + 1}" type="text" class="form-control"
                 id="nameContactInput" aria-describedby="nameSocialNetHelp"
                 placeholder="Nombre Red Social.">
               <small id="nameSocialNetHelp" class="form-text text-muted">e.g Instagram</small>
             </div>
             <div class="col-md-6 col-sm-12">
               <input name="url_contact_user_${contactsInputs.length + 1}" type="url" class="form-control" id="urlContactInput"
                 aria-describedby="urlSocialNetHelp" placeholder="Ingresa tu contacto.">
               <small id="urlSocialNetHelp" class="form-text text-muted">e.g
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
                <input name="position_experience_1" type="text" class="form-control"
                  id="positionExperienceInput" aria-describedby="positionCompanyHelp"
                  placeholder="Posicion que ocupaste en la compañia.">
                <small id="positionCompanyHelp" class="form-text text-muted">e.g Desarrollador
                  web...</small>
              </div>
              <div class="col-md-6 col-sm-12">
                <input name="laboral_experience_1" type="text" class="form-control"
                  id="laboralExperienceInput" aria-describedby="nameSocialNetHelp"
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
            let elementDelete = document.querySelector(`[data-${dataAttribute}="${elementsInputs.length}"]`)
            elementHTML.removeChild(elementDelete);
        }
    }
}