require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const router = require("./routes/sequelize/user.routes");
const router_mongodb = require("./routes/mongodb/log.routes");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

router_mongodb(app);
router(app);

const db = require("./model/sequelize");

db.sequelize.sync();

const db_mongodb = require("./model/mongodb");

db_mongodb.mongoose
    .connect(db_mongodb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the mongodb!");
    })
    .catch(err => {
        console.log("Cannot connect to the mongodb!", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to eseal API." });
});

// app.post("/register", async (req, res) => {

//     try {
//         const { first_name, last_name, email, password } = req.body;

//         if (!(email && password && first_name && last_name)) {
//             res.status(400).send("required");
//         }

//         const oldUser = await User.findOne({ email });

//         if (oldUser) {
//             return res.status(409).send("User already exists")
//         }

//         encryptedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             first_name,
//             last_name,
//             email: email.toLowerCase(),
//             password: encryptedPassword,
//         })

//         const token = jwt.sign(
//             { user_id: user.id, email },
//             process.env.TOKEN_KEY,
//             {
//                 expiresIn: "2h"
//             }
//         )

//         user.token = token;

//         return res.status(201).json(user);

//     } catch (err) {
//         console.log(err);
//     }
// })

// app.post("/login", async (req, res) => {

//     // Our login logic starts here
//     try {
//         // Get user input
//         const { email, password } = req.body;

//         // Validate user input
//         if (!(email && password)) {
//             return res.status(400).send("All input is required");
//         }
//         // Validate if user exist in our database
//         const user = await User.findOne({ email });
//         if (user && (await bcrypt.compare(password, user.password))) {
//             // Create token
//             const token = jwt.sign(
//                 { user_id: user._id, email },
//                 process.env.TOKEN_KEY,
//                 {
//                     expiresIn: "2h",
//                 }
//             );

//             // save user token
//             user.token = token;

//             // user
//             return res.status(200).json({ token: token });
//         }
//         return res.status(400).send("Invalid Credentials");
//     } catch (err) {
//         console.log(err);
//     }
//     // Our register logic ends here
// });

// app.post("/me", auth, (req, res) => {
//     return res.status(200).send("welcome")
// })

// app.get("/searchall", auth, async (req, res) => {
//     const { page, size, search } = req.query;
//     const user = await User.find({ email: { $regex: search } });
//     return res.status(200).json(user)
// })

// app.get("/logall", async (req, res) => {
//     const log = await Log.find();
//     return res.status(200).json(log)
// })

// app.post("/logall", async (req, res) => {
//     try {
//         const { dev_id, e_id, e_lat, e_lng, e_status, e_time } = req.body;
//         if (!(dev_id && e_id && e_lat && e_lng && e_status && e_time)) {
//             res.status(400).send("required");
//         }

//         const log = await Log.create({
//             dev_id,
//             e_id,
//             e_lat,
//             e_lng,
//             e_status,
//             e_time,
//         })
//         return res.status(200).json(log)
//     } catch (err) {
//         console.log(err);
//     }

// })


module.exports = app;