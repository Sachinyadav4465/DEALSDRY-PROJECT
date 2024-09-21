let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let cors = require("cors");
let multer = require("multer");
let registeredUsers = require("./models/registeredUsers");
let modelEmployeeRegister = require("./models/modelEmployeeRegister");

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files
app.use('/Images', express.static('Images'));

// Use dotenv for environment variables (optional, but recommended for secure credentials)
require('dotenv').config();

// MongoDB connection string (you can also use process.env.MONGO_URI if you store it in a .env file)
const MONGO_URI = "mongodb+srv://Sachin:Sachin4465@cluster0.snylryw.mongodb.net/sachin_p";

// MongoDB connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log("Connected to MongoDB Atlas..."); })
    .catch((error) => { console.log("Error connecting to MongoDB Atlas: ", error); });

// Multer storage configuration
let storage = multer.diskStorage({
    destination: function (req, image, cb) {
        return cb(null, "./Images");
    },
    filename: function (req, image, cb) {
        return cb(null, `${image.originalname}`);
    }
});
let upload = multer({ storage });

// Registration form data handler
app.post("/register", (req, res) => {
    registeredUsers.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered.");
            } else {
                let dataForDB = new registeredUsers(req.body);
                dataForDB.save()
                    .then(() => { res.json("Input stored in DB successfully."); })
                    .catch(() => { res.json("Error saving data."); });
            }
        })
        .catch(() => {
            res.json("Registration problem.");
        });
});

// Login handler
app.post("/login", (req, res) => {
    registeredUsers.findOne({ email: req.body.email })
        .then((user) => {
            if (user && user.cnfPassword === req.body.password) {
                res.json({ "status": "success", "id": user._id });
            } else {
                res.json({ "status": "fail" });
            }
        })
        .catch(() => { res.json({ "status": "noUser" }); });
});

// Get user data for dashboard
app.get("/user/:ID", (req, res) => {
    let ID = req.params.ID;
    registeredUsers.findOne({ _id: ID })
        .then((user) => {
            res.json(user.name);
        })
        .catch(() => {
            console.log("Error fetching user.");
        });
});

// Storing employee data with file upload
app.post("/employees", upload.single("image"), (req, res) => {
    modelEmployeeRegister.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered.");
            } else {
                let dataForDB = new modelEmployeeRegister({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    designation: req.body.designation,
                    gender: req.body.gender,
                    course: req.body.course,
                    image: req.file ? `/Images/${req.file.filename}` : null 
                });
                dataForDB.save()
                    .then(() => { res.json("Employee data stored successfully."); })
                    .catch(() => { res.json("Error saving employee data."); });
            }
        })
        .catch(() => {
            res.json("Registration problem.");
        });
});

// Get all employees
app.get("/employee-list", (req, res) => {
    modelEmployeeRegister.find()
        .then((employees) => {
            res.send(employees);
        });
});

// Get employee data for edit
app.get("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID;
    modelEmployeeRegister.findOne({ _id: ID })
        .then((employee) => {
            res.send(employee);
        })
        .catch(() => {
            res.send("Employee not found.");
        });
});

// Update employee data
app.put("/employee-list/:ID", upload.single('image'), (req, res) => {
    let ID = req.params.ID;
    modelEmployeeRegister.updateOne({ _id: ID }, req.body)
        .then(() => { res.send("Successfully updated data."); })
        .catch(() => { res.send("Error updating employee data."); });
});

// Delete employee
app.delete("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID;
    modelEmployeeRegister.deleteOne({ _id: ID })
        .then(() => { res.send("Employee deleted."); })
        .catch(() => { res.send("Error deleting employee."); });
});

// Start server
app.listen(4001, () => {
    console.log("Server listening on port 4001...");
});
