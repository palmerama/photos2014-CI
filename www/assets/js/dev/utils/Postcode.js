var RHYTHM = RHYTHM || {};
RHYTHM.Utils = RHYTHM.Utils || {};

// http://www.qodo.co.uk/blog/javascript-check-if-a-uk-postcode-is-valid/
RHYTHM.Utils.Postcode = {
	/* formats a VALID postcode nicely: AB120XY -> AB1 0XY */
	formatPostcode: function(p) {
		if (RHYTHM.Utils.Postcode.isValidPostcode(p)) {
			var postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i;
			return p.replace(postcodeRegEx,"$1 $2");
		} else {
			return p;
		}
	},

	/* tests to see if string is in correct UK style postcode: AL1 1AB, BM1 5YZ etc. */
	isValidPostcode: function(p) {
		var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2}/i; // full postcode /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
		return postcodeRegEx.test(p);
	}
};