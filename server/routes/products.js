import { Router } from "express";
import * as productsController from "../controllers/products.controller.js";
import { ensureAuthenticated, ensureOwnership } from "../controllers/auth.controller.js";
import { upload } from "../multer.config.js";

const router = Router();

router.route('/').get(productsController.getProducts);
router.route('/:id').get(productsController.getOneProduct);
router.route('/add').post(ensureAuthenticated, upload.single('photo'), productsController.addProduct);
router.route('/myproducts').post(ensureAuthenticated, productsController.getMyProducts);
router.route('/delete/:id').delete(ensureOwnership, productsController.deleteProduct);
router.route('/update/:id').put(productsController.updateProduct);

export default router;