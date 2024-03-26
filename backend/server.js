const express = require("express");
const app = express();
const mongoose= require("mongoose");
app.use(express.json())
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const JWT_PASS = "ctlt114dhfg834yr92wf@£%&nfia91823yr1hqwduhasiua9asf?!iuhew9ry92iodmnq09346457"



const PORT = 3002;

const mongoUrl = "mongodb+srv://ltomlinson01:Dolly0404@users.ixgyzeo.mongodb.net/";

mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(error => {
    console.error("Error connecting to database:", error);
  });

  require("../frontend/src/pages/userDetails");

  const User = mongoose.model("UserInfo")
  app.post("/register", async (req, res) => {
    const{ fname, lname, email, password, confirm} = req.body;

    const encryptedPassword= await bcrypt.hash(password, 15)
    try {
      const oldUser = await User.findOne({email})

      if(oldUser){
       return res.json({error: "User already exists"});
      }
      await User.create({
        fname,
        lname,
        email,
        password: encryptedPassword,
        confirm,
      });
      res.send({status:"success"})
    } catch (error) {
      res.send({status:"Something went wrong"})
    }
  })

  app.post("/login-user", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if(!user){
      return res.json({error: "User Not Found"});
  }
  if(await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email: user.email},JWT_PASS);

    if(res.status(201)){
      return res.json({status:"success", data:token});
    } else {
      return res.json({error: "error"});
    }
  }
  res.json({status: "error", error: "Invalid Password"});
});



 app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try{
    const user = jwt.verify(token, JWT_PASS);
    console.log(user);
    const useremail = user.email;
    User.findOne({ email : useremail })
    .then((data) => {
      res.send({ status: "success", data: data});
    })
    .catch((error) => {
      res.send({ status: "Error", data: error});
    });
  } catch (error) {}
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});






// app.post("/post",async(req,res)=>{
//     console.log(req.body);
//     const {data}= req.body;

//     try{
//     if(data1=="lucy") {
//     res.send({status:"success"})

//     }else {
//         res.send({status:"User Not Found"})
//     }
// }catch(error) {
//     res.send({status: "Something went wrong, try again"});
// }

// });

// require("./userDetails");

// const User = mongoose.model("UserInfo");

// app.post("/register", async (req, res) => {
//   const { "First Name": FirstName, Surname, "Email Address": EmailAddress, "Password": Password, "Confirm Password": ConfirmPassword } = req.body;
//   try {
//     await User.create({
//       FirstName,
//       Surname,
//       EmailAddress,
//       Password,
//       ConfirmPassword,
//     });
//     res.send({ status: "Success" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).send({ status: "Error", error: error.message });
//   }
// });
