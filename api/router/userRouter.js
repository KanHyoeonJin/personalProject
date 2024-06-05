import express from "express";
import { getUser,deleteUser,getUsers,updateProfileImage,updateUser } from "../controller/userController.js";
import { verifyToken, verifyUser } from "../utile/verifyToken.js";
import upload from "../utile/upload.js";

const router = express.Router();

router.get('/getprofile2', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.put('/:id/profileImage2', upload.single('file'), updateProfileImage);

export default router; 