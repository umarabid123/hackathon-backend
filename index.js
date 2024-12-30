const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const authRouter = require("./routes/authRoute");
const todosRoute = require("./routes/todosRoute");




const app = express();
const port = 8000;




// app.use(authVerify)

// function for mongodb connection using mongoose
// const connectDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.DB_URI);
// 		console.log("res");
// 	} catch (err) {
// 		console.error("error happens:", err);
// 	}
// };
connectDB()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth",authRouter)
app.use("/todos",todosRoute)


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



// Authentication

// signup User



app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
