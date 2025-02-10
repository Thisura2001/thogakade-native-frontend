import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import ICustomer from "../Model/./ICustomer";

const initialState:ICustomer[] = [];

const api =axios.create({
    baseURL: 'http://localhost:3000/customers',
})
export const saveCustomer = createAsyncThunk(
    'customers/saveCustomer',
    async (customer:ICustomer)=>{
        try {
            const response =await api.post('/add',customer)
            return response.data;
        }catch (err){
            console.log("Error saving customer ",err)
        }
    }
)
export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (email:string)=>{
        try {
            const response =await api.delete(`/delete/${email}`)
            return response.data;
        }catch (err){
            console.log("Error deleting customer ",err);
        }
    }
)
export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async (customer:ICustomer)=>{
        try {
            const response = await api.put(`/update/${customer.email}`,customer);
            return response.data;
        }catch (err){
            console.log("Error updating customer ",err);
        }
    }
)
export const getAllCustomers = createAsyncThunk(
    'customers/getAllCustomers',
    async ()=>{
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (err){
            console.log("Error getting customers ",err)
        }
    }
)
const customerSlice = createSlice({
    name:'customers',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(saveCustomer.fulfilled,(state, action) => {
                state.push(action.payload);
        })
            .addCase(saveCustomer.rejected,(_, action)=>{
                console.log("failed to save ICustomer ",action.payload);
            })
            .addCase(saveCustomer.pending,(_,action)=>{
                console.log("Pending adding customer ",action.payload);
            })
        builder
            .addCase(deleteCustomer.fulfilled,(state,action)=>{
                return state.filter((customer:ICustomer)=>customer.email!== action.payload.email);
            })
            .addCase(deleteCustomer.rejected,(_,action)=>{
                console.log("Fail to save customer ",action.payload);
            })
            .addCase(deleteCustomer.pending,(_,action)=> {
                console.log("Pending Deleting ICustomer", action.payload);
            })
        builder
            .addCase(updateCustomer.fulfilled,(state,action)=>{
                const customer =state.find((customer:ICustomer)=> customer.email === action.payload.email);
                if (customer){
                    customer.name = action.payload.name;
                    customer.email = action.payload.email;
                    customer.phone = action.payload.phone
                }
            })
            .addCase(updateCustomer.rejected,(_,action)=>{
                console.log("Fail to save customer ",action.payload);
            })
            .addCase(updateCustomer.pending,(_,action)=>{
                console.log("Pending Updating ICustomer ",action.payload);
            })
        builder
            .addCase(getAllCustomers.fulfilled,(state,action)=>{
                action.payload.map((customer:ICustomer)=>{
                    state.push(customer)
                })
            })
            .addCase(getAllCustomers.rejected,(state,action)=>{
                console.log("Fail to save customer ",action.payload);
            })
            .addCase(getAllCustomers.pending,(state,action)=>{
                console.log("Pending Updating ICustomer ",action.payload);
            })
    }
})

export default customerSlice.reducer;