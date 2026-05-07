import User from '../models/User.model.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
export const  Signup =  async (req,res) =>{
   try{
      const {name, email, password} = req.body;
       if(!name || !email || !password){
        return res.status(400).json({Error: "All Fields Are Required"})
       }
       
       const olduser = await User.findOne({email})
       if(olduser){
        return res.status(409).json({Error: "User already exits"})
       }
       
    
       const hashedpass = await bcrypt.hash(password,10)

       const user = await User.create({
        name,
        email,
        password: hashedpass
       }
       )
       const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn: "1d"})
       if(!token){
        return res.status(401).json({msg: "Token error"})
       }
       
       res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24*60*60*1000
       })

       res.status(200).json({ message: "SignUp successful" });

   }catch(e){
      res.status(500).json({Error: "Internal Server Error"})
   }
}
export const Login =  async (req,res) =>{
   try{
      const {email, password} = req.body;
       if(!email || !password){
        return res.status(400).json({Error: "All Fields Are Required"})
       }
       
       const user = await User.findOne({email})
       if(!user){
        return res.status(401).json({Error: "User not exits"})
       }
       
      const Compare = await bcrypt.compare(password, user.password);

      if(!Compare){
         return res.status(401).json({Error: "Credential is Wrong"})
      }

       const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn: "1d"})
       if(!token){
        return res.status(401).json({msg: "Token error"})
       }
       
       res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24*60*60*1000
       })

       res.status(200).json({ message: "Login successful" });

   }catch(e){
      res.status(500).json({Error: "Internal Server Error"})
   }
}

export const Logout = async(req,res)=>{
   const token = req.cookies.token
   if(!token){
      res.status(400).json({Error: "Error Logging out"})
   }
   res.clearCookie("token",{
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24*60*60*1000
   })
   res.status(200).json({msg: "LogOut Success"})

}