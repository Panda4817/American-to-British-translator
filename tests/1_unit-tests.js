const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
let translator = new Translator();

suite("Unit Tests", () => {
	suite("Translate tests - American to British", () => {
		let locale = "american-to-british";
		test("Mangoes are my favorite fruit.", function () {
			let text = "Mangoes are my favorite fruit.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'Mangoes are my <span class="highlight">favourite</span> fruit.',
			});
		});
		test("I ate yogurt for breakfast.", function () {
			let text = "I ate yogurt for breakfast.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'I ate <span class="highlight">yoghurt</span> for breakfast.',
			});
		});
		test("We had a party at my friend's condo.", function () {
			let text = "We had a party at my friend's condo.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'We had a party at my friend\'s <span class="highlight">flat</span>.',
			});
		});
		test("Can you toss this in the trashcan for me?", function () {
			let text =
				"Can you toss this in the trashcan for me?";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'Can you toss this in the <span class="highlight">bin</span> for me?',
			});
		});
		test("The parking lot was full.", function () {
			let text = "The parking lot was full.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'The <span class="highlight">car park</span> was full.',
			});
		});
		test("Like a high tech Rube Goldberg machine.", function () {
			let text = "Like a high tech Rube Goldberg machine.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'Like a high tech <span class="highlight">Heath Robinson device</span>.',
			});
		});
		test("To play hooky means to skip class or work.", function () {
			let text =
				"To play hooky means to skip class or work.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'To <span class="highlight">bunk off</span> means to skip class or work.',
			});
		});
		test("No Mr. Bond, I expect you to die.", function () {
			let text = "No Mr. Bond, I expect you to die.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'No <span class="highlight">Mr</span> Bond, I expect you to die.',
			});
		});
		test("Dr. Grosh will see you now.", function () {
			let text = "Dr. Grosh will see you now.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'<span class="highlight">Dr</span> Grosh will see you now.',
			});
		});
		test("Lunch is at 12:15 today.", function () {
			let text = "Lunch is at 12:15 today.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'Lunch is at <span class="highlight">12.15</span> today.',
			});
		});
	});
	suite("Translate tests - British to American", () => {
		let locale = "british-to-american";
		test("We watched the footie match for a while.", function () {
			let text = "We watched the footie match for a while.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'We watched the <span class="highlight">soccer</span> match for a while.',
			});
		});
		test("Paracetamol takes up to an hour to work.", function () {
			let text = "Paracetamol takes up to an hour to work.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'<span class="highlight">Tylenol</span> takes up to an hour to work.',
			});
		});
		test("First, caramelise the onions.", function () {
			let text = "First, caramelise the onions.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'First, <span class="highlight">caramelize</span> the onions.',
			});
		});
		test("I spent the bank holiday at the funfair.", function () {
			let text = "I spent the bank holiday at the funfair.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.',
			});
		});
		test("I had a bicky then went to the chippy.", function () {
			let text = "I had a bicky then went to the chippy.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.',
			});
		});
		test("I've just got bits and bobs in my bum bag.", function () {
			let text =
				"I've just got bits and bobs in my bum bag.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.',
			});
		});
		test("The car boot sale at Boxted Airfield was called off.", function () {
			let text =
				"The car boot sale at Boxted Airfield was called off.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.',
			});
		});
		test("Have you met Mrs Kalyani?", function () {
			let text = "Have you met Mrs Kalyani?";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'Have you met <span class="highlight">Mrs.</span> Kalyani?',
			});
		});
		test("Prof Joyner of King's College, London.", function () {
			let text = "Prof Joyner of King's College, London.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'<span class="highlight">Prof.</span> Joyner of King\'s College, London.',
			});
		});
		test("Tea time is usually around 4 or 4.30.", function () {
			let text = "Tea time is usually around 4 or 4.30.";
			assert.deepEqual(translator.translate(text, locale), {
				text: text,
				translation:
					'Tea time is usually around 4 or <span class="highlight">4:30</span>.',
			});
		});
	});
	suite("Translate tests - Highlighting", () => {
		test("Mangoes are my favorite fruit.", function () {
			let text = "Mangoes are my favorite fruit.";
			let locale = "american-to-british";
			let res = translator.translate(text, locale);
			assert.include(
				res.translation,
				'<span class="highlight">favourite</span>'
			);
		});
		test("I ate yogurt for breakfast.", function () {
			let text = "I ate yogurt for breakfast.";
			let locale = "american-to-british";
			let res = translator.translate(text, locale);
			assert.include(
				res.translation,
				'<span class="highlight">yoghurt</span>'
			);
		});
		test("We watched the footie match for a while.", function () {
			let text = "We watched the footie match for a while.";
			let locale = "british-to-american";
			let res = translator.translate(text, locale);
			assert.include(
				res.translation,
				'<span class="highlight">soccer</span>'
			);
		});
		test("Paracetamol takes up to an hour to work.", function () {
			let text = "Paracetamol takes up to an hour to work.";
			let locale = "british-to-american";
			let res = translator.translate(text, locale);
			assert.include(
				res.translation,
				'<span class="highlight">Tylenol</span>'
			);
		});
	});
});
