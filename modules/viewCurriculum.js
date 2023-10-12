import curriculum from "../api/models/curriculumModel.js"
import softSkill from "../api/models/softSkillModel.js";
import hardSkill from "../api/models/hardSkillModel.js";
import language from "../api/models/languageModel.js";
import programmingLanguage from "../api/models/programmingLanguageModel.js";

const d = document;
const $ = (e) => d.querySelector(e);

export const createCurriculum = async (id) => {
    console.log(id);
    let cus = await curriculum.getOne(id);
    let softuser = await Promise.all(cus.soft_skills_user.map(async (id) => await softSkill.getOne(id)));
    let harduser = await Promise.all(cus.hard_skills_user.map(async (id) => await hardSkill.getOne(id)));
    let langs = await Promise.all(cus.languages_user.map(async (id) => await language.getOne(id)));
    let prolangs = await Promise.all(cus.programming_languages_user.map(async (id) => await programmingLanguage.getOne(id)));

    console.log(softuser);
    console.log(harduser);
    console.log(langs);
    console.log(prolangs);

    $("#main-content").removeChild($("#crud-content"));
    $("#main-content").insertAdjacentHTML("beforeend", /*html*/`
    <div class="content">
        <div class="row">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col">
                            <h1 class="m-0">Curriculum de: ${cus.name_user} ${cus.surname_user ? cus.surname_user : ""}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row p-1">
            <div id="main-curriculum" class="container-md rounded p-3 shadow" data-action="curriculum">
                <div id="left-side">
                    <div id="photo-user">
                        <img src="${cus.photo_user ? cus.photo_user : "https://gogeticon.net/files/2038419/c25c2390b168d85cbac54877c8588038.png"}"
                            alt="">
                    </div>
                    <div id="description-user">
                        <p>
                            ${cus.description_user}
                        </p>
                    </div>
                    <div id="contact-user">
                        <h3>Contacto</h3>
                        <div class="contact">
                            
                            ${cus.contact_user.map((contact) => {
        return `<ul>
    <li class="name-contact">${contact.name_contact_user}</li>
    <li class="url-contact">${contact.contact_form_user}</li>
    </ul>`
    }).join("")}
                            
                        </div>
                    </div>
                </div>
                <div id="right-side">
                    <div id="header-user">
                        <div id="full-name-user">
                            <h1>${cus.name_user} ${cus.surname_user}</h1>
                        </div>
                        <div id="name-user">
                            <h2>${cus.title_user}</h2>
                        </div>
                    </div>

                    <div id="other-information">
                        <div id="soft-skills">
                            <h3>Soft Skills</h3>
                            <ul id="list-soft-skill">
                            ${softuser.map((soft) => {
        return `
                                    <li class="skill">${soft.soft_skill_name}</li>`
    }).join("")}
                            </ul>
                        </div>

                        <div id="hard-skills">
                            <h3>Hard Skills</h3>
                            <ul id="list-hard-skill">
                            ${harduser.map((hard) => {
        return `
                                                            <li class="skill">${hard.hard_skill_name}</li>`
    }).join("")}
                            </ul>
                        </div>

                        <div id="languages">
                            <h3>Idiomas</h3>
                            <ul id="list-languages">
                            ${langs.map((lang) => {
        return `
                                                                                    <li class="skill">${lang.language_name}</li>`
    }).join("")}
                            </ul>
                        </div>
                    </div>

                    <div id="laboral-experience">
                        <h3>Experiencia Laboral</h3>
                        <div class="experience">
                        ${cus.laboral_experience_user.map((lab) => {
        return `<ul>
                        <li class="position-experience skill">${lab.position_experience}</li>
                        <li class="about-experience skill">${lab.laboral_experience}</li>
                        </ul>`
    }).join("")}
                        </div>
                    </div>
                </div>

                <div id="footer">
                    <small>Desarrollado por <a href="https://github.com/Dabrox02">Jaider Mendoza</a></small>
                </div>
            </div>
        </div>
    </div>

    `)
}