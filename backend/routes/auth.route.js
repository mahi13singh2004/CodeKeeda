import express from "express"
const router=express.Router()
import protectRoute from "../middlewares/protectRoute.js"
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js"

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/checkAuth",protectRoute,checkAuth)

export default router