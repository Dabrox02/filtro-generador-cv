import config from "../config.js"

export class Crud {
    constructor(uri) {
        this.uri = uri;
    }

    async getAll() {
        return await (await fetch(this.uri, { method: "GET" })).json();
    }

    async getOne() {
        return await (await fetch(this.uri, { method: "GET" })).json();
    }

    async postOne({ obj }) {
        return await (await fetch(this.uri, { method: "POST", body: obj })).json();
    }

    async putOne({ obj }) {
        return await (await fetch(this.uri, { method: "PUT", body: obj })).json();
    }

    async deleteOne() {
        return await (await fetch(this.uri, { method: "DELETE" })).json();
    }
}

// const c = new Crud("http://localhost:5010/languages");
// console.log(await c.getAll());

