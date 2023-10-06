/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState = {
    user : user,
    token : token,
    students : [],
    coordinators : [],
    student : {}
}

const adminSlice = createSlice({
    name : "admin",
    initialState,
    
})