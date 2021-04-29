const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
function swap(json) {
	var ret = {};
	for (var key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
const britishToAmericanSpelling = swap(americanToBritishSpelling)
const britishToAmericanTitles = swap(americanToBritishTitles)

class Translator {
	remove_punctuation(token) {
		if (token in americanToBritishTitles) {
			return false;
		}
		let punctuation = [".", "!", ",", "?", ";", ":"];
		for (let j = 0; j < punctuation.length; j++) {
			if (token.endsWith(punctuation[j])) {
				return true;
			}
		}
		return false;
	}

	translate_to_british(tokens) {
		let result = [];
		let skip = 0;
		for (let index = 0; index < tokens.length; index++) {
			if (skip != 0 && index != skip) {
				continue;
			}
			skip = 0;
			let result_token = tokens[index];
			let translated = false;
			if (tokens[index] in americanToBritishTitles) {
				result_token =
					americanToBritishTitles[tokens[index]];
				translated = true;
			}
			let without_end_pun = tokens[index];
			if (
				this.remove_punctuation(without_end_pun) &&
				translated == false
			) {
				without_end_pun = tokens[index].slice(
					0,
					tokens[index].length - 1
				);
			}

			if (without_end_pun in americanOnly) {
				result_token = americanOnly[without_end_pun];
				translated = true;
			}
			if (without_end_pun in americanToBritishSpelling) {
				result_token =
					americanToBritishSpelling[without_end_pun];
				translated = true;
			}
			if (
				without_end_pun.length == 5 &&
				without_end_pun.charAt(2) == ":"
			) {
				result_token =
					without_end_pun.slice(0, 2) +
					"." +
					without_end_pun.slice(3);
				translated = true;
			}

            if (
				without_end_pun.length == 4 &&
				without_end_pun.charAt(1) == "."
			) {
				result_token =
					without_end_pun.slice(0, 1) +
					":" +
					without_end_pun.slice(2);
				translated = true;
			}

			if (
				without_end_pun != tokens[index] &&
				result_token != tokens[index]
			) {
				result_token += tokens[index].charAt(
					tokens[index].length - 1
				);
			}

			if (translated) {
				result.push(result_token);
				continue;
			}

			let phrase_count = tokens.length - index;
			let word_count = 2;
			let string_without_pun = "";
			let string = "";
			let res = "";
            let res_word_count = 2
            let res_string = ""
            let res_string_without = ""
			while (word_count <= phrase_count) {
				string_without_pun = "";
				string = "";
				for (let j = 0; j < word_count; j++) {
					string += tokens[index + j];
					string += " ";
				}
				string = string.slice(0, string.length - 1);
				string_without_pun = string;
				if (this.remove_punctuation(string_without_pun)) {
					string_without_pun = string.slice(
						0,
						string.length - 1
					);
				}
				if (
					americanOnly.hasOwnProperty(string_without_pun)
				) {
					res = americanOnly[string_without_pun];
                    res_word_count = word_count
                    res_string = string
                    res_string_without = string_without_pun
					translated = true;
				}
				word_count += 1;
			}
			if (res_string != res_string_without) {
				res += res_string.charAt(res_string.length - 1);
			}
			if (translated) {
				result_token = res;
				result.push(result_token);
				for (let s = 0; s < res_word_count - 1; s++) {
					result.push("");
				}
				skip = index + res_word_count;
				continue;
			}
			result.push(result_token);
		}
		return result;
	}
	translate_to_american(tokens) {
		let result = [];
		let skip = 0;
		for (let index = 0; index < tokens.length; index++) {
			if (skip != 0 && index != skip) {
				continue;
			}
			skip = 0;
			let result_token = tokens[index];
			let translated = false;
			if (tokens[index] in britishToAmericanTitles) {
				result_token =
					britishToAmericanTitles[tokens[index]];
				translated = true;
			}
			let without_end_pun = tokens[index];
			if (
				this.remove_punctuation(without_end_pun) &&
				translated == false
			) {
				without_end_pun = tokens[index].slice(
					0,
					tokens[index].length - 1
				);
			}

			if (without_end_pun in britishOnly) {
				result_token = britishOnly[without_end_pun];
				translated = true;
			}
			if (without_end_pun in britishToAmericanSpelling) {
				result_token =
					britishToAmericanSpelling[without_end_pun];
				translated = true;
			}
			if (
				without_end_pun.length == 5 &&
				without_end_pun.charAt(2) == "."
			) {
				result_token =
					without_end_pun.slice(0, 2) +
					":" +
					without_end_pun.slice(3);
				translated = true;
			}

            if (
				without_end_pun.length == 4 &&
				without_end_pun.charAt(1) == "."
			) {
				result_token =
					without_end_pun.slice(0, 1) +
					":" +
					without_end_pun.slice(2);
				translated = true;
			}

			if (
				without_end_pun != tokens[index] &&
				result_token != tokens[index]
			) {
				result_token += tokens[index].charAt(
					tokens[index].length - 1
				);
			}

			if (translated) {
				result.push(result_token);
				continue;
			}

			let phrase_count = tokens.length - index;
			let word_count = 2;
			let string_without_pun = "";
			let string = "";
			let res = ""
            let res_word_count = 2
            let res_string = ""
            let res_string_without = ""
			while (word_count <= phrase_count) {
				string_without_pun = "";
				string = "";
				for (let j = 0; j < word_count; j++) {
					string += tokens[index + j];
					string += " ";
				}
				string = string.slice(0, string.length - 1);
				string_without_pun = string;
				if (this.remove_punctuation(string_without_pun)) {
					string_without_pun = string.slice(
						0,
						string.length - 1
					);
				}
				if (
					britishOnly.hasOwnProperty(string_without_pun)
				) {
					res = britishOnly[string_without_pun];
                    res_word_count = word_count
                    res_string = string
                    res_string_without = string_without_pun
					translated = true;
				}
				word_count += 1;
			}
			if (res_string != res_string_without) {
				res += res_string.charAt(res_string.length - 1);
			}
			if (translated) {
				result_token = res;
				result.push(result_token);
				for (let s = 0; s < res_word_count - 1; s++) {
					result.push("");
				}
				skip = index + res_word_count;
				continue;
			}
			result.push(result_token);
		}
		return result;
	}

	translate(text, locale) {
		let result = [];
		let tokens = text.split(" ");
		let text_lowercase = text.toLowerCase();
		let tokens_lowercase = text_lowercase.split(" ");
		let a = "american-to-british";
		let b = "british-to-american";
		let lowercase_result = [];
		if (locale == a) {
			lowercase_result = this.translate_to_british(
				tokens_lowercase
			);
		} else if (locale == b) {
			lowercase_result = this.translate_to_american(
				tokens_lowercase
			);
		}
		for (let index = 0; index < tokens.length; index++) {
			if (lowercase_result[index] == "") {
				continue;
			}
			if (
				lowercase_result[index] == tokens_lowercase[index]
			) {
				result.push(tokens[index]);
				continue;
			}
			let string = '<span class="highlight">';
			if (
				tokens[index].charAt(0) ==
				tokens[index].charAt(0).toUpperCase()
			) {
				string += lowercase_result[index]
					.charAt(0)
					.toUpperCase();
				if (
					this.remove_punctuation(lowercase_result[index])
				) {
					string +=
						lowercase_result[index].slice(
							1,
							lowercase_result[index].length - 1
						) +
						"</span>" +
						lowercase_result[index].charAt(
							lowercase_result[index].length - 1
						);
				} else {
					string +=
						lowercase_result[index].slice(1) + "</span>";
				}
			} else {
				if (
					this.remove_punctuation(lowercase_result[index])
				) {
					string +=
						lowercase_result[index].slice(
							0,
							lowercase_result[index].length - 1
						) +
						"</span>" +
						lowercase_result[index].charAt(
							lowercase_result[index].length - 1
						);
				} else {
					string +=
						lowercase_result[index].slice(0) + "</span>";
				}
			}

			result.push(string);
		}

		let result_text = result.join(" ");
		if (result_text == text) {
			result_text = "Everything looks good to me!";
		}
		return { text: text, translation: result_text };
	}
}

module.exports = Translator;
