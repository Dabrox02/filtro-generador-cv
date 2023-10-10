import crud from "../crud/crud.js";

const endpoint = "/curriculums";
const interfaz = {
    "name_user": "string",
    "surname_user": "string",
    "description_user": "string",
    "photo_user": "url",
    "contact_user": "array",
    "laboral_experience_user": "array",
    "languages_user": "array",
    "soft_skills_user": "array",
    "hard_skills_user": "array",
    "programming_languages_user": "array"
};

const curriculum = crud({ endpoint, interfaz });
export default curriculum;

// console.log(await curriculum.postOne(
//     {
//         "name_user": "Preston Tyler",
//         "surname_user": "Reed",
//         "description_user": "Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia.",
//         "photo_user": "",
//         "contact_user": [],
//         "laboral_experience_user": [],
//         "languages_user": [],
//         "soft_skills_user": [],
//         "hard_skills_user": [],
//         "programming_languages_user": []
//     }
// ));

// {
//     "name_user": "Preston Tyler",
//     "surname_user": "Reed",
//     "description_user": "Donec vitae erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia.",
//     "photo_user": "",
//     "contact_user": [],
//     "laboral_experience_user": [],
//     "languages_user": [],
//     "soft_skills_user": [],
//     "hard_skills_user": [],
//     "programming_languages_user": []
// },
// {
//     "name_user": "Melvin Tran",
//     "surname_user": "Kramer",
//     "description_user": "dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh",
//     "photo_user": "",
//     "contact_user": [],
//     "laboral_experience_user": [],
//     "languages_user": [],
//     "soft_skills_user": [],
//     "hard_skills_user": [],
//     "programming_languages_user": []
// },
// {
//     "name_user": "Bert Roberts",
//     "surname_user": "Hensley",
//     "description_user": "Morbi",
//     "photo_user": "",
//     "contact_user": [],
//     "laboral_experience_user": [],
//     "languages_user": [],
//     "soft_skills_user": [],
//     "hard_skills_user": [],
//     "programming_languages_user": []
// },
// {
//     "name_user": "Wynne Leach",
//     "surname_user": "Burke",
//     "description_user": "mauris. Morbi non sapien molestie orci tincidunt",
//     "photo_user": "",
//     "contact_user": [],
//     "laboral_experience_user": [],
//     "languages_user": [],
//     "soft_skills_user": [],
//     "hard_skills_user": [],
//     "programming_languages_user": []
// },
// {
//     "name_user": "Keith Vargas",
//     "surname_user": "Larson",
//     "description_user": "ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo",
//     "photo_user": "",
//     "contact_user": [],
//     "laboral_experience_user": [],
//     "languages_user": [],
//     "soft_skills_user": [],
//     "hard_skills_user": [],
//     "programming_languages_user": []
// }