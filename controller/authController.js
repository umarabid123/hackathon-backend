const bcrypt = require("bcrypt");
const User = require("../models/authModel");
var jwt = require("jsonwebtoken");

const secretKey = "abid$12345@umar";

const signUp = async (req, res) => {
	try {
		if (!req.body.password) {
			return res.status(400).json({
				data: [],
				message: "Password is required",
			});    
		}
		var hash = await bcrypt.hash(req.body.password, 8);
		console.log("hash: ", hash);
		let newUser = new User({
			username: req.body?.userName,
			email: req.body?.email,
			password: hash,
			address: req.body?.address,
		});

		// Save the user and wait for the operation to complete
		let output = await newUser.save();

		// Respond with success
		res.json({
			data: newUser,
			status: "200",
			message: "User created successfully",
		});
	} catch (e) {
		// Respond with an error
		res.status(400).json({
			data: [],
			status: "400",
			error: e.message,
			message: "An error occurred while creating user",
		});
	}
};
const signIn = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		console.log("user: ", user);

		if (!user) {
			return res.status(401).json({
				data: [],
				message: "User not found",
			});
		}
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword) {
			return res.status(401).json({
				data: [],
				message: "Invalid password",
			});
		}
		var token = jwt.sign(
			{ email: req.body.email, userName: req.body.userName },
			secretKey
		);
		console.log("token: ", token);
		res.json({
			token: token,
			username: user.username,
			email: user.email,
			address: user.address,
			status: "200",
			message: "User logged in successfully",
		});
	} catch (e) {
		return res.status(400).json({
			data: [],
			message: "User not found",
		});
	}
};

const sendResetPassword = async () => {
	try {
		const userExist = await User.findOne({ email: req.body.email });
		if(!userExist) { throw new Error("User not found"); }
		if(!userExist.verified) { throw new Error ("User not verified"); }
		const otpDetails = {
			email:req.body.email,
			subject:"Reset Password",
			message:"Reset Password for user with email ",
			duration:1
		}
	} catch (e) {}
};
module.exports = { signUp, signIn };
