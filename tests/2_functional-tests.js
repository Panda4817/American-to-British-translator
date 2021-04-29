const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests - test /api/translate", () => {
	let text = "Mangoes are my favorite fruit.";
	let locale = "american-to-british";
	let result =
		'Mangoes are my <span class="highlight">favourite</span> fruit.';
	test("text and locale fields", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: text, locale: locale })
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				assert.property(res.body, "translation");
				assert.property(res.body, "text");
				assert.deepEqual(res.body, {
					text: text,
					translation: result,
				});
				done();
			});
	});
    test("text and invalid locale fields", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: text, locale: "britishToSpanish" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				assert.property(res.body, "error");
				assert.deepEqual(res.body, {error: "Invalid value for locale field"});
				done();
			});
	});
    test("missing text field", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ locale: "britishToAmerican" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				assert.property(res.body, "error");
				assert.deepEqual(res.body, {error: "Required field(s) missing"});
				done();
			});
	});
    test("missing locale field", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: text })
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				assert.property(res.body, "error");
				assert.deepEqual(res.body, {error: "Required field(s) missing"});
				done();
			});
	});
    test("empty text", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: "     ", locale: locale })
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				assert.property(res.body, "error");
				assert.deepEqual(res.body, {error: "No text to translate"});
				done();
			});
	});
    test("no translation needed text", function (done) {
		chai
			.request(server)
			.post("/api/translate")
			.send({ text: text, locale: "british-to-american" })
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.isObject(res.body);
				assert.property(res.body, "translation");
				assert.property(res.body, "text");
				assert.deepEqual(res.body, {
					text: text,
					translation:
						'Everything looks good to me!',
				});
				done();
			});
	});
});
