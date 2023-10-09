import validator from 'validator';

export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const isNumber = (any) => {
    return !isNaN(Number(any));
}

export const isCampoValido = ({ campo = "", valor, tipoEsperado }) => {
    if (!valor) throw new Error(`Undefined field`);
    if (valor.constructor.name.toLowerCase() !== tipoEsperado.toLowerCase()) throw new Error(`Field: ${campo} - Value: ${valor} Does NOT correspond to the type of data requested`);
    return { [campo]: valor instanceof Date ? valor.toISOString().split('T')[0] : valor };
}