import userModel from "../model/user.js"
import auth from '../common/auth.js'
const mailVerify=async(req,res)=>{

try {
    const data=userModel.findOne({email:req.body.email})
    if(!data){
        req.body.password=await auth.hashPassword(req.body.password)
        await userModel.create(req.body)
        res.send({message:'successfully data store'})    
    }else{
        res.status(400).send({message:'user exist'})
    }
    
} catch (error) {
    res.send({message:'failed store data',error:error.message})    
}
}

export default {mailVerify}