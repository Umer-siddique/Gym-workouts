const { getWorkouts,singleWorkouts, createWorkout,deleteWorkout,updateWorkout}=require("../controllers/workoutController")
const express=require("express")
const requireAuth = require("../middleware/requireAuth")
const router=express.Router()

// authentication middleware
router.use(requireAuth)

// get all workouts
router.get("/",getWorkouts)

// get a single workouts
router.get("/:id",singleWorkouts)

// Post a new workouts
router.post("/",createWorkout)

// delete a workouts
router.delete("/:id",deleteWorkout)

// update a workouts
router.patch("/:id",updateWorkout)

module.exports=router