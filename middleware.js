import Sequelize  from 'sequelize'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import User from './models/user'

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username -> Email
    if (!req.body.username) {
        res.status(400).send({ message: "Username can not be empty!" });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty!" });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({ message: "Password can not be empty!" });
        return;
    }

    User.findOne({
        where: { username: req.body.username }
    }).then((user) => {
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" })
            return
        }
        User.findOne({
            where: { email: req.body.email }
        }).then((user) => {
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" })
                return
            }
            next()
        })
    })
}

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    console.log(process.env.SECERT)
    jwt.verify(token, process.env.SECRET, (error, decorder) => {
        if (error) {
            return res.status(403).send({ message: error });
        }
        req.userId = decorder.id;
        next();
    })
}

export default { checkDuplicateUsernameOrEmail, verifyToken }