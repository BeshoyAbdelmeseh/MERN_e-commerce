import productsModel from "../models/products.model.js";
import jwt from 'jsonwebtoken';

export const getProducts = (req, res) => {
    productsModel.find()
    .then((products) => res.json({ 
        success: true,
        products: products
     }))
    .catch(err => res.json({
        success: false,
        msg: err.name
    }));
}

export const getOneProduct = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        productsModel.findById(req.params.id)
        .then(product => {
            const isOwned = product.Owner === decodedJWT.id;
            res.json({ 
                success: true,
                product: {
                    _id: product._id,
                    Description: product.Description,
                    Name: product.Name,
                    Photo: product.Photo,
                    Price: product.Price,
                    Owned: isOwned
                }
            })
        })
        .catch(err => res.json({
            success: false,
            msg: err.name
        }));
    } catch (error) {
        productsModel.findById(req.params.id)
        .then(product => {
            res.json({ 
                success: true,
                product: {
                    _id: product._id,
                    Description: product.Description,
                    Name: product.Name,
                    Photo: product.Photo,
                    Price: product.Price,
                    Owned: false
                }
            })
        })
        .catch(err => res.json({
            success: false,
            msg: err.name
        }));
    }
}

export const getMyProducts = (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        productsModel.find({Owner: decodedJWT.id})
        .then(products => res.json({ 
            success: true,
            products: products
        }))
        .catch(err => res.json({
            success: false,
            msg: err.name
        }));
    } catch (error) {
        res.json({
            success: false,
            msg: "An error occurred."
        })
    }    
}

export const addProduct = (req, res) => {
    if (req.body.photoName === "" || req.body.photoName === null || req.body.photoName === undefined){
        res.json({
            success: false,
            msg: "Provide an image."
        })
        return;
    }

    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        const Name = req.body.name;
        const Price = req.body.price;
        const Photo = process.env.BE_URL + req.body.photoName;
        const Owner = decodedJWT.id;
        const Description = req.body.description;

        const product = new productsModel({
            Name,
            Price,
            Owner,
            Photo,
            Description
        });

        product.save()
        .then(() => res.json({ success: true }))
        .catch(err => res.json({
            success: false,
            msg: err.name
        }))
    } catch (error) {
        
    }
}

export const deleteProduct = (req, res) => {
    productsModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false }));
}

export const updateProduct = (req, res) => {
    productsModel.findByIdAndUpdate(req.params.id, {
        SKU: req.body.SKU,
        Name: req.body.Name,
        Price: req.body.Price,
        Attribute: req.body.Attribute
    })
    .then(() => res.json("Updated"))
    .catch(err => res.status(400).json(`Error: ${err}`));
}