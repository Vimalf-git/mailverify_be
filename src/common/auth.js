import bcrypt from 'bcryptjs';
import Jwt  from 'jsonwebtoken';
const hashPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt)
    return hash 
}
const hashCompare=async (password,hash)=>{
    return await bcrypt.compare(password,hash);
    }
const creatToken=async(payload)=>{
    const token= await Jwt.sign(payload,process.env.SECRET_STRING,{
       expiresIn:process.env.expire_time
    });
    return token;
}
const validate=async(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1];
    if(token){
        const decodeToken=await Jwt.decode(token);
        const curTime=(+ new Date())/1000;
        
        if(curTime<decodeToken.exp){
            next()
        }else{
            res.status(400).send({message:'token expired'})
        }
    }else{

        res.status(400).send({message:'No token found'})
    }
}



let String="1dd9fc6e6c0225684e299eba4a9ae73244379453916718e6c9c13521902abec39ded45e879b0fdfaac1c89df6173e23ab8c03454125e288e5c81cbbab7723b7d"
let findData=await hashCompare("@Vimal97",String);
console.log(findData);
export default {hashPassword,hashCompare,
    creatToken,validate
}