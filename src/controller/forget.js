import userModel from "../model/user.js"
import auth from "../common/auth.js";

import mail from 'nodemailer'



const forgetPassword = async (req, res) => {

    try {
        console.log("hii"+req.body.email);
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

            user.otp = token;
            userModel.create(user);
            // console.log(`http://localhost:8000/forgetpass/${user._id}/${token}`);

         const transporter=mail.createTransport({
                service: 'gmail',
                port:465,
                // secure:true,
                auth: {
                    user: process.env.email,
                    pass: process.env.pass
                }
            });
            const html = `<h1>OTP</h1><p>click and reset your password:
            http://localhost:5173/resetpassword/${user._id}/${token}    
                    </p>`;

            const dummy= {
                from: 'lancervimal@gmail.com',
                to: req.body.email,
                subject: 'welcom msg',
                html: html
            }
            transporter.sendMail(dummy)
            // console.log(dummy);
            // console.log(process.env.email);
            // console.log(process.env.pass);

            res.send({ message: 'token generated', link: `http://localhost:8000/forgetpass/${user._id}/${token}` })
        } else {
            res.status(400).send({ message: 'Invalid email' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message })
    }
}
const getForgetres = async (req, res, next) => {
    console.log(req.params);
    try {
        const data = await userModel.findOne({ _id: req.params.id }, { otp: 1, _id: 0 })
        // console.log(data.otp);
        // console.log(req.params.token);
        if (data.otp === req.params.token) {
            res.send({
                message: 'OTP successfully matched',
                OTP: true
            })
        } else {
            res.send({
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
        console.log(data);
        data.password = await auth.hashPassword(req.body.password)
        console.log(data);
        res.status(200).send({ message: 'password updated' })
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message })
    }

}
export default { forgetPassword, getForgetres, updatePassword }