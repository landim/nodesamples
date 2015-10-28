"use strict";

module.exports = function(text, object) {
	var parsedText = text;
	var placesRegex = /\{\{[^\{\{\,]*\}\}/ig;
	var objPropertyRegex = /[^{\s](.*)[^\s}]/ig;

	var matches = text.match(placesRegex);

	matches.forEach(function (substring) {
		var objProperty = substring.match(objPropertyRegex);

		var obj = objProperty[0].match(/\w*/ig)[0];
		var prop = objProperty[0].match(/\w*/ig)[2];

		var result = object[obj];
		if (result) 
			result = result[prop];
		
		if (result)
			parsedText = parsedText.replace(substring, result);
		else
			parsedText = parsedText.replace(substring, "<nothing>");
	});
	return parsedText;
}