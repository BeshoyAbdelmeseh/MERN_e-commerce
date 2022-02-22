import userModel from "../models/users.model.js";
import productsModel from "../models/products.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRegister = (req, res) => {
    if(!req.body.username || !req.body.password || req.body.username === "" || req.body.password === "")
        return res.json({
            success: false,
            msg: "Provide username and password."
    });
    userModel.findOne({username: req.body.username})
    .then(async user => {
        if (user)
            return res.json({
                success: false,
                msg: 'User already exists.'
            });
        else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userInstance = new userModel({
                username: req.body.username,
                password: hashedPassword
            });
            userInstance.save()
            .then(() => res.status(201).json({
                success: true,
                msg: 'Done'
            }))
            .catch(err => {
                console.log(`Error ${err}`);
                res.status(400).json()
            })
        }
    })
    .catch(err => {
        console.log(`Error ${err}`);
        res.status(400).json()
    })
}

export const userLogin = (req, res) => {
    if(!req.body.username || !req.body.password || req.body.username === "" || req.body.password === "")
        return res.json({
            success: false,
            msg: "Provide username and password."
    });
    userModel.findOne({username: req.body.username})
    .then(user => {
        if (user){
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err){
                    console.log(err);
                    return res.status(400).json();
                }
                else{
                    if (result === true){
                        const token = jwt.sign({
                            id: user._id
                        }, process.env.JWT_SECRET, {expiresIn: "1d"});
                        res.json({
                            success: true,
                            username: user.username,
                            token: token
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            msg: "Incorrect username or password."
                        });
                    }
                }
            })
        }
        else{
            res.json({
                success: false,
                msg: "Incorrect username or password."
            });
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json();
    })
}

export const ensureAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        userModel.findOne({id: decodedJWT.id})
        .then(user => {
            if (user)
                return next();
            else
                return res.status(403).json("Forbidden");
        })
        .catch(err => {
            console.log(`Error ${err}`);
            return res.status(401).json("Error");
        })
    } catch (error) {
        return res.status(401).json("Error");
    }
}

export const ensureOwnership = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        productsModel.findById(req.params.id)
        .then(response => {
            if (response.Owner === decodedJWT.id)
                return next();
            else
                return res.status(403).json("Forbidden");
        })
        .catch(() => {
            return res.status(401).json("Error");
        });
    } catch (error) {
        return res.status(401).json("Error");
    }
}

export const checkAuth = (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        userModel.findOne({id: decodedJWT.id})
        .then(user => {
            if (user)
                return res.json({
                    username: user.username
                });
            else
                return res.json({
                    username: null
                });
        })
        .catch(err => {
            return res.json({
                username: null
            });
        })
    } catch (error) {
        return res.json({
            username: null
        });
    }
}