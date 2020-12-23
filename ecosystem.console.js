const repl = require("repl");

function puts(p) {
	p.then(u => console.log(u)).catch(err => console.log("ERR", err));
}

global["puts"] = puts;
global["collection_helper"] = require("./dist/helper/collection_helper").default;
global["constant_helper"] = require("./dist/helper/constant_helper").default;
global["app"] = require("./dist/app").default;

repl.start({
	prompt: "app > "
});
