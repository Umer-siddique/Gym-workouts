const mongoose = require("mongoose")
const Workout = require("../models/workoutModel")

// Get all workouts
const getWorkouts = async (req, res) => {
    // res.json({ msg: "Get all workouts" })
    const user_id=req.user._id;
    try {
        const allWorkouts = await Workout.find({user_id}).sort({ createdAt: -1 })
        if (!allWorkouts) {
            return res.status(400).json({ msg: "No documents exist in your Database" })
        }
        res.status(200).json(allWorkouts)
    }catch(err){
        res.status(400).json({msg:err.message})
    }
   
}

// Get a Single workouts
const singleWorkouts = async (req, res) => {
    const { id } = req.params;
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(400).json({msg:"No such documents exist"})
    // }
    try {
        const singleWorkout = await Workout.findById(id);
        if (!singleWorkout) {
            return res.status(400).json({ msg: "No such documents exist" })
        }
        res.status(200).json(singleWorkout)
    } catch (err) {
        res.status(400).send({ msg: err.message })
    }
}

// Create a new Workouts
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ err: err.message })
        console.log(err.message)
    }
}

// Delete a workouts
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
       const deletedWorkout= await Workout.findOneAndDelete({_id:id})
       if(!deletedWorkout){
        return res.status(400).json({msg:"No such document exist"})
       }
       res.status(200).json(deletedWorkout)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
    // res.json({ msg: "Delete a workouts" })
}

// Update Workouts
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    // res.json({ msg: "Update the workouts" })
    try{
       const updatedWorkout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body
       })
       if(!updatedWorkout){
        return res.status(400).json({msg:"No such document exist"})
       }
       res.status(200).json(updatedWorkout)
    }catch(err){
        res.status(400).json({ msg: err.message })
    }
}

module.exports = {
    getWorkouts,
    singleWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}