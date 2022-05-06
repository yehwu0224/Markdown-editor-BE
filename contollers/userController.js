import Sequelize  from 'sequelize'
import User from '../models/user'
import Role from '../models/role'
import Article from '../models/article'
import bcrypt from 'bcryptjs/dist/bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import defaultText from '../defaultText'

dotenv.config();

const signup = async (req, res, next) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    User.create(user).then((user) => {

        const article = {
            title: "welcome 歡迎使用",
            content: defaultText,
            UserId: user.id
        };
        Article.create(article)
        
        // user role = 1
        user.setRole(1).then(() => {
            res.send({
                message: "User was registered successfully!",
                user: user
            });
        }).catch((error) => res.status(500).send({ message: error }))

    }).catch((error) => {
        res.status(500).send({ message: error })
    })
}

const signin = async (req, res, next) => {
    User.findOne({ where: {username: req.body.username} }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        // 驗證密碼:
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        // 簽發Token:
        // jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: 86400}); // expiresIn: 24 hrs

        user.getRole().then((role) => {
            res.status(200).send({
                username: user.username,
                email: user.email,
                role: role.rolename,
                accessToken: token
            });
        }).catch((error) => {
            res.status(500).send({ message: error })
        })
        
    }).catch((error) => {
        res.status(500).send({ message: error })
    })
}

export default { signup, signin }