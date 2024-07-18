import express from "express"
import mongoose from "mongoose"
import LOLUserModel from "../models/LOLUserModel.js"

export const getUser = async (req, res) => {
    const { riotId } = req.body

    try {
        const LOLuser = await LOLUserModel.findOne({ riotId: riotId})

        res.status(200).json(LOLuser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    // const LOLUser = req.body
    //optinally
    // const { username, riotId, rank } = req.body
    // //using destructuring

    // // const newLOLUser = new LOLUserModel({...LOLUser})
    // const newLOLUser = new LOLUserModel({ username, riotId, rank })

    // console.log(newLOLUser)

    console.log(req.body)
    const newUser = new LOLUserModel(req.body)

    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json(error.message)
    }
}
