const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
	mail: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
}, { timestamps: true })

userSchema.statics.signup = async function (mail, password) {
	if (!mail || !password) {
		throw Error('Please fill all fields')
	}

	if (!validator.isEmail(mail)) {
		throw Error('Please enter a valid email address')
	}

	const exists = await this.findOne({ mail })

	if (exists) {
		throw Error('Email address already in use')
	}

	if (!validator.isStrongPassword(password)) {
		throw Error('Please choose a stronger password')
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	const user = await this.create({ mail, password: hash })

	return user
}

userSchema.statics.login = async function (mail, password) {
	if (!mail || !password) {
		throw Error('Please fill all fields')
	}

	if (!validator.isEmail(mail)) {
		throw Error('Please enter a valid email address')
	}

	const user = await this.findOne({ mail })

	if (!user) {
		throw Error('There is no account with this email address')
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw Error('Incorrect Password')
	}

	return user
}

module.exports = mongoose.model('User', userSchema)