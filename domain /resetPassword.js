const express = require("express");
const router = require("router");

router.use("/", async (res, req) => {
	try {
		const { email } = req.body;
        if(!email) throw  new Error("Enter a valid email address");
        
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
});
