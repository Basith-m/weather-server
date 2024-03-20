const users = require('../models/userSchema')
const bcrypt = require('bcrypt')

// register
exports.userRegister = async (req, res) => {
    let { username, email, password } = req.body
    if (password.length >= 8) {
        // creating salt
        const salt = await bcrypt.genSalt(10)
        // password hashing / crypt
        const hashedPass = await bcrypt.hash(password, salt);
        password = hashedPass

        try {
            const existingUser = await users.findOne({ email })
            if (existingUser) {
                res.status(406).json("Account already exist !!!")
            } else {
                const newUser = new users({
                    username,
                    email,
                    password
                })
                await newUser.save()
                res.status(200).json(newUser)
            }
        } catch (error) {
            res.status(401).json(`Register API failed , Error: ${error} `)
        }
    }else{
        res.status(400).json("Password must be at least 8 characters long.");
    }

    
}

// login
exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {

            // validating password
            const validity = await bcrypt.compare(password, existingUser.password)
            // 400 - unauthenticated user
            if (!validity) {
                res.status(400).json("Incorrect email or password !!!")
            } else {
                res.status(200).json({
                    existingUser
                })
            }
        }
        else {
            res.status(406).json("Incorrect email or password")
        }
    }
    catch (err) {
        res.status(401).json(`Register API Failed, Error: ${err}`)
    }
}