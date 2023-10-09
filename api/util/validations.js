import validator from 'validator';

const v = validator;
let str = "<script>console.log('hola')</script>"
// console.log(v.blacklist(str, `/~\/<>()`));

// let date = new Date("2023-01-02");
// let date = "2023-01-02";
// console.log(v.isDate(new Date(date), { format: "YYYY-MM-DD", strictMode: true }));
