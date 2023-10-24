import userModel from "../model/user.js"
import auth from "../common/auth.js";

import mail from 'nodemailer'



const forgetPassword = async (req, res) => {

    try {
        // console.log("hii" + req.body.email);
        const user = await userModel.findOne({ email: req.body.email });
        // console.log(user);
        if (user) {
            const token = await auth.creatToken(
                {
                    username: user.username,
                    email: user.email
                }
            )
            // await userModel.findOne({$set:{otp:token}})

            user.token = token;
            userModel.create(user);
            // console.log(`http://localhost:8000/forgetpass/${user._id}/${token}`);

            const transporter = mail.createTransport({
                service: 'gmail',
                port: 465,
                // secure:true,
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            });
            let link = `http://localhost:5173/resetpassword?emailtoken=${token}&id=${user._id}`;
            const html = `<h1>OTP</h1>
            <a href=${link}>click and reset your password:</a>`;
            const dummy = {
                from: 'lancervimal@gmail.com',
                to: req.body.email,
                subject: 'welcom msg',
                html: html
            }
            transporter.sendMail(dummy)
            // console.log(dummy);
            // console.log(process.env.email);
            // console.log(process.env.pass);

            res.send({ message: 'token generated', link: link })
        } else {
            res.status(400).send({ message: 'Invalid email' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message })
    }
}
const getForgetres = async (req, res) => {
    // console.log('vimal');
    console.log(req.params.id);
    try {
        const data = await userModel.findOne({ token:req.params.token})
        // console.log(data.otp);
        // console.log(req.params.token);
        // console.log(req.params.id);
        // console.log(data.token);
        if (data) {
            console.log('ji');
            res.status(200).send({
                message: 'OTP successfully matched',
                OTP: true,
                mail:data.email
            })

            data.otp="";
            userModel.create(data);
        } else {
            res.status(400).send({
                message: 'OTP is not correct', OTP: false
            })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message })

    }
}




const updatePassword = async (req, res) => {
    try {
        const data = await userModel.findOne({ email: req.body.email });
        console.log(req.body.email);
        console.log("enter into log");
        console.log(data);
        if(data){
            console.log('enter into change');
            console.log();
            data.password = await auth.hashPassword(req.body.password)
            // console.log(data);
            userModel.create(data)
            res.status(200).send({ message: 'password updated' })
        }else{
            res.status(400).send({ message: 'user is not exist' })
        }

    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message })
    }

}
export default { forgetPassword, getForgetres, updatePassword }