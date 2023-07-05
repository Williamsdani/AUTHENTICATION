
const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

const newUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //HASHED THE PASSWORD//
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        const data = {
            username,
            email,
            password: hash,
        }

        const createUser = new userModel(data)
       // console.log(process.env.JWT_TOKEN);
        // generate token
        const newToken = jwt.sign({
            username,
            password
        }, process.env.JWT_TOKEN, { expiresIn: "1d" })
        createUser.token = newToken
        await createUser.save()
        if (createUser) {
            res.status(200).json({
                status: "success",
                message: "createed",
                data: createUser

            })

        } else {
            res.status(400).json({
                status: "failed",
                message: "cannot create user",
            })
        }

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        })
    }

}
// signin

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body

        const check = await userModel.findOne({ username: username })
        if (!check) { res.status(400).json({ message: "username not found" }) }

        const isPassword = await bcryptjs.compare(password, check.password)
        if (!isPassword) { res.status(400).json({ message: "wrong password" }) }
        // generate token
        const createToken = jwt.sign({
            username,
            password
        }, process.env.JWT_TOKEN, { expiresIn: "1d" })
        check.token = createToken
        await check.save()
        res.status(210).json({
            status: "success",
            message: "log in succesful",
            data: check
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
}




module.exports = { newUser };