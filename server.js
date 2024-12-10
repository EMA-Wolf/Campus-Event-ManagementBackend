const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
// const pool = require('./api/config/db');
const authRoutes = require('./api/routes/authRoutes');
const eventRoutes = require('./api/routes/eventRoutes');
require("dotenv").config()

// Middleware to parse incoming JSON requests 
// app.use(cors())
app.use(cors({
    origin: [process.env.FIRST_FRONTEND_URL, process.env.SECOND_FRONTEND_URL,process.env.THIRD_FRONTEND_URL,process.env.FOURTH_FRONTEND_URL],
    credentials: true
  })); 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      body: req.body,
      auth: req.headers.authorization
    });
    next();
  });


//app routes
app.use('/api/auth',authRoutes) 
app.use('/api/events',eventRoutes)
const PORT = process.env.PORT || 3000

app.get('/', (req, res) =>{  
    res.send('Welcome to my API!') 
}) 

// app.post('/create-student-info', async (req, res) =>{

//     const { student_id, name, email,password } = req.body;
//     const query =  "INSERT INTO Users (name, email, student_id, password) VALUES ($1, $2, $3, $4)"

//     try {
//         await pool.query(query, [name, email, student_id, password]);
//         console.log(`Student with name ${name} information added successfully`);
//         res.status(201).send({message: 'Student information added successfully', user: {name, email, student_id, password}});
//     } catch (err) {
//         console.error('Error inserting student information:', err);
//         res.status(404).send("Couldn't insert new user");
//     }
// })

// app.get("/allcontacts",async (req, res)=>{
//    try{
//     const query = 'SELECT * FROM contacts'
//     const results = await pool.query(query);
//     console.log(results.rows)
//     res.status(200).json(results.rows);
//    }catch(err){
//     console.error("Error executing query",err.stack);
//     res.status(500).send('Error executing query');
//    }
 
// })

// app.post("/newContact",async (req, res) => {
//     const { name, email, phone, address, access_number } = req.body;
//     try{
//         const query = 'INSERT INTO contacts (name, email, phone, address,access_number) VALUES ($1,$2,$3,$4,$5)';
//         await pool.query(query,[name, email, phone, address, access_number]);
//         console.log('New contact added');
//         res.status(201).send('New contact added');
//     }catch(err){
//         console.error("Error executing query",err.stack);
//         res.status(500).send('Error executing query');
//     }
// })

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})