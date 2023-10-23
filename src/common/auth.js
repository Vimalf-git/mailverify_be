import bcrypt from 'bcryptjs';
import Jwt  from 'jsonwebtoken';
const hashPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt)
    return hash 
}
const creatToken=async(payload)=>{
    const token=Jwt.sign(payload,"arkeke&^%$hvdgs",{
       expiresIn:'1m'
    });
    return token;
}
const hashCompare=async (password,hash)=>{
return await bcrypt.compare(password,hash);
}
export default {hashPassword,hashCompare,
    creatToken
}