"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
	const translator = new Translator();

	app.route("/api/translate").post((req, res) => {
		let text = req.body.text;
		let locale = req.body.locale;
		if (!text && text != "") {
			res.json({ error: "Required field(s) missing" });
		}
		if (!locale) {
			res.json({ error: "Required field(s) missing" });
		}
    text = text.trim()
    if (text == ""){
      res.json({ error: "No text to translate" });
    }
		const a = "american-to-british";
		const b = "british-to-american";
		if (locale != a && locale != b) {
			res.json({ error: "Invalid value for locale field" });
		}
		let result = translator.translate(text, locale);
		res.json(result);
	});
};
