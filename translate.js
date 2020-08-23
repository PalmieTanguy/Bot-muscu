const translate = require("@vitalets/google-translate-api")
const args = process.argv;
langage = args[2]
text = args [3]
console.log(langage, text)

//translate(text,translate)
translate(text,{
    to: translate.languages.getCode(langage),
    from:""
}).then(res => {
    console.log(res.text);
});