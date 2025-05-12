const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 8000;

let conn = null;

const initDB = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tutorial'
  })
}

const validateData = (userData) => {
  let errors = []

  //ใน js ถ้าส่งค่าว่างเปล่ามาจะเป็น undefined แล้วใส่ ! ก็จะเป็น true เป็นการเช็คค่าว่างได้
  if(!userData.firstname){
     errors.push('กรุณากรอกชื่อจริง')
  }

  if(!userData.lastname){
     errors.push('กรุณากรอกนามสกุล')
  }

  if(!userData.age){
     errors.push('กรุณากรอกอายุ')
  }  

  if(!userData.gender){
     errors.push('กรุณาเลือกเพศของคุณ')
  }

  if(!userData.interests){
     errors.push('กรุณาเลือกสิ่งที่สนใจ')
  }

  if(!userData.description){
     errors.push('กรุณาใส่ลายละเอียดของคุณ')
  }

     return errors
}

//  Get /users
app.get("/users", async (req, res) => {
  const results = await conn.query('SELECT * FROM users')
    res.json(results[0])
});


// Post /users
app.post("/users", async (req, res) => {
  try {
    const user = req.body;

    const errors = validateData(user)
    if(errors.length > 0){
      throw { 
        message: 'กรอกข้อมูลไม่ครบ',
        errors: errors
      }
    }

    const results = await conn.query('INSERT INTO users Set ?', user)
    res.json({
    message: 'insert user successfully',
    data: results[0]
  })
  } catch (error) {
    const errorMessage = error.message || 'something wrong'
    const errors = error.errors || []
    console.error('error message',error.message)
    res.status(500).json({ 
      message: errorMessage,
      errors: errors
     })
  }
});

// get /users/:id
app.get("/users/:id", async (req, res) => {
 
  try {
    const id = parseInt(req.params.id);
    const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
   
    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'user not found' }
    } 
    res.json(results[0][0])

  } catch (error) {
    console.error('error message',error.message)
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({ 
      message: 'something wrong',
      error: error.message
     })
  }
});



//  Put /users/:id
app.put("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    const results = await conn.query(
      'UPDATE users Set ? WHERE id = ?',
      [updateUser, id]
    )
    res.json({
    message: 'Update successfully',
    data: results[0]
  })
  } catch (error) {
    console.error('error message',error.message)
    res.status(500).json({ 
      message: 'something wrong',
     })
  }
});

//  Delete /users/:id
app.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await conn.query( 
    'DELETE FROM users WHERE id = ?',[id] )
    res.json({
    message: 'Delete successfully',
    data: results[0]
  })
  } catch (error) {
    console.error('error message',error.message)
    res.status(500).json({ 
      message: 'something wrong',
     })
  }
});


app.listen(port, async () => {
  await initDB();
  console.log(`http server is running on port ${port}`);
});

