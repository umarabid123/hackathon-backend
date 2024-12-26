const { signUp, signIn } = require("../controller/authController");
var express = require("express");
var authRouter = express.Router()
authRouter.post("/signup", signUp);


// login user
authRouter.post("/login",signIn);

module.exports = authRouter;

// todosRoute.post('/authenticate', authVerify,async (req, res) => {
// 	try{
// 		var decoded = jwt.verify(req.body.token, secretKey);
// 		if(!decoded){
// 			return res.status(401).json({
//                 data: [],
//                 message: "Unauthorized",
//             });
// 		}
// 		res.json({
// 			data:decoded,
// 			status: "200",
//             message: "User authenticated successfully",
// 		})
// 	}catch (e) {
// 		return res.status(401).json({
//             data: [],
//             message: "Unauthorized",
//         });
// 	}

// })