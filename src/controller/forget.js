import userModel from "../model/user.js"
import auth from "../common/auth.js";

import mail from 'nodemailer'



const forgetPassword = async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            const token = await auth.creatToken(
                {
                    username: user.username,
                    email: user.email
                }
            )
            user.token = token;
            userModel.create(user);
            const transporter = mail.createTransport({
                service: 'gmail',
                port: 465,
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            });
            let link = `${process.env.SECRET_LINK}emailtoken=${token}&id=${user._id}`;
            const html = `<h1>OTP</h1>
            <a href=${link}>click and reset your password:</a>`;
            const dummy = {
                from: 'lancervimal@gmail.com',
                to: req.body.email,
                subject: 'welcom msg',
                html: html
            }
            transporter.sendMail(dummy)
            res.send({ message: 'token generated', link: link })
        } else {
            res.status(400).send({ message: 'Invalid email' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message })
    }
}
const getForgetres = async (req, res) => {
    try {
        const data = await userModel.findOne({ token:req.params.token})
        if (data) {
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
        
        if(data){
            data.password = await auth.hashPassword(req.body.password)
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