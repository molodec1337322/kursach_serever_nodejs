const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {User} = require("../models/user")
const keys = require("../config/keys")


/**
 * Авторизация пользователя в системе
 * @param {JSON} req {"email": "почта_пользователя", "password": "пароль пользователя"}
 * @param {JSON} res {"token": "Bearer здесь_токен_авторизированного_пользователя"} или {"message": "Email или пароль не верны"}
 */
module.exports.login = async function (req, res) {
    console.log("------------------------")
    console.log(req)
    const candidate = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (candidate) {
        const passsword = bcrypt.compareSync(req.body.password, candidate.password)
        if (passsword) {
            const token = "Bearer " + candidate.remember_token
            res.cookie('token', token, {httpOnly: true})
            res.status(200).json({
                message: token,
            })
        } else {
            res.status(404).json({
                message: "Email или пароль не верны"
            })
        }
    } else {
        res.status(404).json({
            message: "Email или пароль не верны"
        })
    }
}

/**
 * Регистрация пользователя в системе
 * @param {JSON} req  {"email": "почта_пользователя", "password": "пароль_пользователя", "nickname": "никнейм_пользователя"}
 * @param {JSON} res  {"message": "Пользователь создан"} или {"message": "Ошибка"}
 */
module.exports.register = async function (req, res) {

    const candidate = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    
    const nicknameCandidate = await User.findOne({
        where: {
            nickname: req.body.nickname
        }
    })

    if (candidate) {
        res.status(409).json({
            message: "Пользователь с таким email уже существует"
        })
    } else if(nicknameCandidate){
        res.status(409).json({
            message: "Пользователь с таким ником уже существует"
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        try {
            await User.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
                nickname: req.body.nickname,
                remember_token: jwt.sign({
                    email: req.body.email,
                    nickname: req.body.nickname
                }, keys.jwt)
            })

            res.status(201).json({
                message: "Пользователь создан"
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Ошибка"
            })
        }
    }
}