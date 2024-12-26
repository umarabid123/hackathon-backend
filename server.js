const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const app = express();
const port = 8000;

const secretKey = "abid$12345@umar"

const authVerify = (req, res, next) => {
    try {
        console.log('req.headers recieved', req.headers);
        if (!req.headers.authorization) {
            res.json({
                data: [],
                status: "error",
                error: "Login required"
            })
        }
        var decoded = jwt.verify(req.headers.authorization, secretKey);
        console.log('decoded', decoded);
        if (!decoded) {
            res.json({
                data: [],
                status: "error",
                error: "Login required"
            })
        }
        req.body.user = decoded;
        next();
    } catch (error) {
        res.json({
            data: [],
            status: "error",
            error: error
        })
    }
}
// app.use(authVerify)

// function for mongodb connection using mongoose
const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://muhammadumar:abid.12345@cluster.3mpl5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
		);
		console.log("res");
	} catch (err) {
		console.error("error happens:", err);
	}
};
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const TodosSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
const Todos = mongoose.model("Todos", TodosSchema);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// app.get("/api/", (req, res) => {
// 	try{

//         // query parameters
//         // console.log("query params: " + req.query);

//         // route parameters
//         // console.log("query params: " + req.params);

//         // request body
//         console.log("request body: " + req.method, req.body,req.headers);

//         let user = [
//             // { id:req.query.id, name: req.query.name, email: "john@example.com" },
//             { id:req.params.id, name: "John", email: "johnbell@example.com" },
//             // { id:req.query.id, name: "Johnr", email: "johnball@example.com" },
//             // { id:req.query.id, name: "Johns", email: "johngree@example.com" },
//             // { id:req.query.id, name: "Johnf", email: "johnbell@example.com" },
//             // { id:req.query.id, name: "Johng", email: "johnball@example.com" },
//             // { id:req.query.id, name: "Johnh", email: "johngree@example.com" },
//         ];
//         res.json({
//             data: user,
//             status: '200',
//             message: 'User data retrieved successfully'

//         });
//     }catch(error){

//         res.json({
//             data: [],
//             status: '400',
//             error:error,
//             message: 'An error occurred while retrieving user data'
//         });
//     }
// });
// app.post("/products", (req, res) => {
//     let products =[{
//         id: 1,
//         name: "Product 1",
//         price: 100.00
//     },{
//         id: 2,
//         name: "Product 2",
//         price: 200.00
//     },{
//         id: 3,
//         name: "Product 3",
//         price: 300.00
//     },{
//         id: 4,
//         name: "Product 4",
//         price: 400.00
//     }]
//     res.json(products);
// })
// app.delete("/product/delete", (req, res) => {
//     let products =[{
//         id: 1,
//         name: "Product 1",
//         price: 100.00
//     },
// {
//     id: 2,
//         name: "Product 2",
//         price: 200.00
// },{
//     id: 3,
//         name: "Product 3",
//         price: 300.00
// },{
//     id: 4,
//         name: "Product 4",
//         price: 400.00
// }]
// res.json(products);
// })
// app.put("/products/update", (req, res) => {
//     let products =[{
//         id: 1,
//         name: "Product 1",
//         price: 100.00
//     },
// {
//     id: 2,
//         name: "Product 2",
//         price: 200.00
// },{
//     id: 3,
//         name: "Product 3",
//         price: 300.00
// },{
//     id: 4,
//         name: "Product 4",
//         price: 400.00
// }]
// res.json(products);
// })

app.get("/todos", authVerify , async (req, res) => {
	try {
		let todos = await Todos.find();
		res.json({
			data: todos,
			status: "200",
			message: "Todos data retrieved successfully",
		});
	} catch (error) {
		res.json({
			data: [],
			status: "400",
			error: error,
			message: "An error occurred while retrieving todos data",
		});
	}
});

app.get("/todos/:id", authVerify,async (req,res) => {
	try {
		const id = req.params?.id;
		// let todo = await Todos.find({id:id});
		let todo = await Todos.findOne({ id: id });
		res.json({
			data: todo,
			status: "200",
			message: "Todos data retrieved successfully",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while retrieving todos data",
		});
	}
});
app.post("/todos/create", authVerify,async (req, res) => {
	try {
		let newTodo = new Todos({
			id: req.body?.id,
			title: req.body?.title,
			description: req.body?.description,
		});
		let output = await newTodo.save();
		res.json({
			data: output,
			status: "success",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while creating todo",
		});
	}
});
app.put("/todos/update/:id", authVerify,async (req, res) => {
	try {
		let id = req.params?.id;
		let todo = await Todos.findOneAndUpdate(
			{ id: id },
			{ title: req.body?.title, description: req.body?.description },
			{ new: true }
		);
		res.json({
			data: todo,
			status: "success",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while updating todo",
		});
	}
});
app.delete("/todos/delete/:id", authVerify, async (req, res) => {
	try {
		let id = req.params?.id;
		let todo = await Todos.findOneAndDelete({ id: id });
		res.json({
			data: todo,
			status: "200",
			message: "Todo deleted successfully",
		});
	} catch (e) {
		res.json({
			data: [],
			status: "400",
			error: e,
			message: "An error occurred while deleting todo",
		});
	}
});

// Authentication

// signup User
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	address: String,
});
const User = mongoose.model("User", userSchema);

app.post("/auth/signup", async (req, res) => {
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
});

// login user
app.post("/auth/login",async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) { 
			return res.status(401).json({
                data: [],
                message: "User not found",
            });
		}
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			return res.status(401).json({
                data: [],
                message: "Invalid password",
            });
		}
		var token = jwt.sign({ email:req.body.email, userName:req.body.userName  }, secretKey);
		console.log('token: ', token);
		res.json({
			data: [{
				token:token,
				username: user.username,
				email: user.email,
                address: user.address,
			}],
            status: "200",
            message: "User logged in successfully",
        });

	} catch (e) {
		return res.status(400).json({
			data: [],
			message: "User not found",
		});
	}
});

app.post('/authenticate', authVerify,async (req, res) => {
	try{
		var decoded = jwt.verify(req.body.token, secretKey);
		if(!decoded){
			return res.status(401).json({
                data: [],
                message: "Unauthorized",
            });
		}
		res.json({
			data:decoded,
			status: "200",
            message: "User authenticated successfully",
		})
	}catch (e) {
		return res.status(401).json({
            data: [],
            message: "Unauthorized",
        });
	}

})
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
