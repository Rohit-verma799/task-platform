import User from "../models/User.model.js";
import jwt from 'jsonwebtoken'
export const authenticated = async(req,res,next) =>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(404).json({Error: "UnAuthenticated to perform this action"})
        }
    
        const data = jwt.decode(token, process.env.JWT_SECRET)
        const user = await User.findById(data.userId);
    
        req.user = user;
        next();
    }catch(e){
        return res.status(500).json({Error: "Intetrnal Server error"})
    }
}

