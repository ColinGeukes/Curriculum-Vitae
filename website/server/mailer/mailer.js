
// Library used for sending mails.
const nodemailer = require("nodemailer");
// Library used for opening files on the system.
const fs = require('fs');
// Loading template strings
const compiler = require('es6-template-strings/compile');
const resolver = require('es6-template-strings/resolve-to-string');
// Logging to the console
const Console = console;

class Mailer {
	constructor(config) {
		this.address = config.address;
		this.username = config.username;
		this.transporter = nodemailer.createTransport({
			"service": 'Gmail',
			"auth": {
				"type": 'OAuth2',
				"user": config.address,
				"clientId": config.clientId,
				"clientSecret": config.clientSecret,
				"refreshToken": config.refreshToken,
				"accessToken": config.accessToken
			}
		});
		this.formats = {};
		this.loadMailFormats(config.formatDirectory);
	}

	/**
	 * Method to load all mail formats that reside in a directory (not recursively).
	 * @param dirname - the directory name where the email formats are located.
	 */
	loadMailFormats(dirname) {
		let files;

		// Get all files that are in the directory.
		try {
			files = fs.readdirSync(dirname);
		} catch (e) {
			// If the directory is invalid, we stop loading queries.
			Console.error("Error, while opening email format dir", e.message);
			return;
		}

		// Each file in the map contains a query, add them to the pool of queries.
		const that = this;

		files.forEach((filename) => {
			that._loadMailFormat(dirname, filename);
		});
	}

	/**
	 * Method to load a SQL statement from a single file.
	 * @param {string} dirname - the path to the file, without the filename.
	 * @param {string }filename - the name of the file
	 * @return {void}
	 */
	_loadMailFormat(dirname, filename) {
		const filenameSplit = filename.split('.');

		// If the first extension is not a html extension, then skip that file.
		if (filenameSplit[1] !== 'html') {
			return;
		}

		// Read the file and store it in the queries.
		try {
			this.formats[filenameSplit[0]] = compiler(fs.readFileSync(dirname + filename, 'utf-8'));
		} catch (e) {
			// Log the error to the console object.
			Console.error("Error, while opening email format file", e.message);
		}
	}

	/**
	 * Method to send email.
	 * @param to - the email address you want to send mail to.
	 * @param subject - Subject of this message
	 * @param format - The format identifier, for loading prebuild formats.
	 * @param formatValues - Dictionary of all values that should be substituted in the format.
	 * @param success - Function that will fire on success.
	 * @param failure - Function that will fire on failure.
	 */
	sendMail(to, subject, format, formatValues, success, failure) {
		// Return a failure if the format does not exists.
		if (!(format in this.formats)) {
			failure(Error("Format not found in formats"));
		}

		// Send the email.
		this.transporter.sendMail({
			'from': `${this.username} <${this.address}>`,
			to,
			subject,
			'html': resolver(this.formats[format], formatValues)
		}, (err, info) => {
			if (err) {
				failure(err);
			} else {
				success(info);
			}
		});
	}
}

module.exports = Mailer;


/*
 * // async..await is not allowed in global scope, must use a wrapper
 * Async function main(){
 *
 * 	// Generate test SMTP service account from ethereal.email
 * 	// Only needed if you don't have a real mail account for testing
 * 	Let testAccount = await nodemailer.createTestAccount();
 *
 * 	// create reusable transporter object using the default SMTP transport
 * 	Let transporter = nodemailer.createTransport({
 * 		Host: "smtp.ethereal.email",
 * 		Port: 587,
 * 		Secure: false, // true for 465, false for other ports
 * 		Auth: {
 * 			User: testAccount.user, // generated ethereal user
 * 			Pass: testAccount.pass // generated ethereal password
 * 		}
 * 	});
 *
 * 	// send mail with defined transport object
 * 	Let info = await transporter.sendMail({
 * 		From: '"Fred Foo 👻" <foo@example.com>', // sender address
 * 		To: "bar@example.com, baz@example.com", // list of receivers
 * 		Subject: "Hello ✔", // Subject line
 * 		Text: "Hello world?", // plain text body
 * 		Html: "<b>Hello world?</b>" // html body
 * 	});
 *
 * 	Console.log("Message sent: %s", info.messageId);
 * 	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 *
 * 	// Preview only available when sending through an Ethereal account
 * 	Console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 * 	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 * }
 *
 * Main().catch(console.error);
 */
