import express from 'express';
import sequelize from '../dbconfig';
import articleController from '../contollers/articleController';
import userController from '../contollers/userController';
import Verify from '../middleware';
var router = express.Router();

// Authentication
router.post('/signup', [Verify.checkDuplicateUsernameOrEmail], userController.signup);  
router.post('/signin', userController.signin);

// articles
router.post('/articles', [Verify.verifyToken], articleController.create);
router.get('/articles', [Verify.verifyToken], articleController.findAll);
router.get('/articles/:id', [Verify.verifyToken], articleController.findOne);
router.put('/articles/:id', [Verify.verifyToken], articleController.update);
router.delete('/articles/:id', [Verify.verifyToken], articleController.deleteOne);

module.exports = router;