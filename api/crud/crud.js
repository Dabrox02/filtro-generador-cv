import config from "../config.js"
import { isObjectEmpty, isNumber, isCampoValido } from "../util/validations.js";

const getAll = async ({ endpoint }) => {
    try {
        if (!endpoint) return { status: 404, message: "Not Found" };
        let res = await (await fetch(`${config.uri}${endpoint}`)).json();
        if (isObjectEmpty(res)) return { status: 404, message: "Not Found" };
        res = res.filter((e) => !isObjectEmpty(e));
        return res;
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
        return await (await fetch(`${config.uri}${endpoint}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
        })).json();
    } catch (e) {
        return { status: 400, message: e.message }
    }
}

const putOne = async ({ endpoint, interfaz, obj }) => {
    try {
        if (isObjectEmpty(obj)) return { status: 400, message: "Not Parameters" };
        let data = { ...await getOne({ endpoint, id: obj.id }) };
        if (isObjectEmpty(data)) return { status: 404, message: "Not Found" };
        Object.entries(interfaz).forEach(e => Object.assign(data, isCampoValido({ campo: e[0], valor: obj[e[0]], tipoEsperado: e[1] })));
        return await (await fetch(`${config.uri}${endpoint}/${data.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })).json();
    } catch (e) {
        return { status: 400, message: e.message }
    }
}

const delOne = async ({ endpoint, id }) => {
    try {
        if (!id) return { status: 400, message: "Not Id Found" };
        return await (await fetch(`${config.uri}${endpoint}/${id}`, {
            method: "DELETE"
        })).json();
    } catch (e) {
        return { status: 400, message: e.message }
    }
}


const crud = ({ endpoint, interfaz }) => ({
    getAll: async () => await getAll({ endpoint }),
    getOne: async (id) => await getOne({ endpoint, id }),
    postOne: async (obj) => await postOne({ endpoint, interfaz, obj }),
    putOne: async (obj) => await putOne({ endpoint, interfaz, obj }),
    delOne: async (id) => await delOne({ endpoint, id })
});

export default crud;