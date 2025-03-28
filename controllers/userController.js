let User = require('../model/user')
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken')
let register = async (req, res)=> {
    
    let {email, name, password} = req.body
    console.log(email,name,password)

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hashSync(password, salt);

  let user = new User({email,name,password})
     await user.save()

   let payload ={id: user.id}

     jwt.sign(
       payload,
       process.env.JWT_SECERT,
       {
         expiresIn:'1hr'
       }, (err,token) => {
        if(err){
          throw err
        }
        else{
          res.send(token)
        }
       }
     ).catch(()=>{
         console.log("Error signing jwt!")
     })
    
    res.send(user)}


const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECERT,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

let login = async (req, res) => {
  try {
    let { inp_email, inp_password } = req.body;

    let user = await User.findOne({ email: inp_email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let isValidPWD = await bcrypt.compare(inp_password, user.password);

    if (!isValidPWD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    let payload = { id: user.id };
    let token = await signToken(payload); // Await the signed token

    res.json({ token });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

let profile = async(req, res) => 
  { 
    
   res.status(200).send(req.user)
}
let transaction = async(req, res) => 
  
 {   
   res.status(200).send("This is transaction page")
}

let wishlist = async(req, res) => 
 {  
  res.status(200).send("This is wishlist page")
  
}



module.exports ={
    login, 
    register,
    profile,
    transaction,
    wishlist
}