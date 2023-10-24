import userModel from "../model/user.js"
const getAllData=async(req,res)=>{
   const data=await userModel.find({},{password:0,token:0,_id:0});
   try {
    console.log(data);
    if(data){
        res.status(200).send(({message:'data fetched successfully',data}))
    }else{
        res.status(400).send(({message:'No such data found',}))
    }
   } catch (error) {
    res.status(500).send({message:'Internal server error',error:error.message})
   }
}

export default{getAllData}