import config from "../config.js"
import { isObjectEmpty, isNumber, isCampoValido } from "../util/validations.js";
import validator from "validator"
const v = validator;

const getAll = async ({ endpoint }) => {
    try {
        if (!endpoint) return { status: 404, message: "Not Found" };
        let res = await (await fetch(`${config.uri}${endpoint}`)).json();
        if (isObjectEmpty(res)) return { status: 404, message: "Not Found" };
        return res.filter((e) => !isObjectEmpty(e));
    } catch (err) {
        return { status: 400, message: err.message }
    }
}

const getOne = async ({ endpoint, id }) => {
    try {
        if (!isNumber(id)) return { status: 400, message: `Id no valido ${id}` };
        if (!endpoint) return { status: 404, message: "Not Found" };
        let res = await (await fetch(`${config.uri}${endpoint}/${id}`)).json();
        if (isObjectEmpty(res)) return { status: 404, message: "Not Found" };
        return res;
    } catch (err) {
        return { status: 400, message: err.message }
    }
}

const postOne = async ({ endpoint, interfaz, obj }) => {
    try {
        let body = {};
        if (isObjectEmpty(obj)) return { status: 400, message: "Not Parameters" };
        Object.entries(interfaz).forEach(e => Object.assign(body, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })));
        console.log(body);
        // return await (await fetch(`${config.uri}${endpoint}`, { method: "POST", headers: { "content-type": "application/json" }, body })).json();
    } catch (e) {
        return { status: 400, message: e.message }
    }
}

const crud = ({ endpoint, interfaz }) => ({
    getAll: async () => await getAll({ endpoint }),
    getOne: async (id) => await getOne({ endpoint, id }),
    postOne: async (obj) => await postOne({ endpoint, interfaz, obj }),
});

export default crud;