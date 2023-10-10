export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const isNumber = (any) => {
    return !isNaN(Number(any));
}

export const isURL = (url) => {
    var regex = /^(https?|https):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
}

export const isCampoValido = ({ campo, valor, tipoEsperado }) => {
    if (valor === undefined || valor === null) throw new Error(`Undefined field`);
    if (tipoEsperado == "date") {
        if (isNaN(new Date(valor).getTime())) throw new Error(`Field: ${campo} - Value: ${valor} Does NOT correspond a DATE`);
        return { [campo]: new Date(valor).toISOString().split('T')[0] };
    };
    if (tipoEsperado == "url") {
        if (isURL(valor) || valor == "") return { [campo]: valor };
    }
    if (valor.constructor.name.toLowerCase() !== tipoEsperado.toLowerCase()) throw new Error(`Field: ${campo} - Value: ${valor} Does NOT correspond to the type of data requested`);
    return { [campo]: valor };
}