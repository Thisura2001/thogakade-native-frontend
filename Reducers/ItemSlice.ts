import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import IItem from "../Model/IItem";

const initialState:IItem[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/items',
});
export const saveItem = createAsyncThunk(
    'items/saveItem',
    async (item:IItem)=>{
        try {
            const response = await api.post('/add',item);
            return response.data;
        }catch (e){
            console.log("error saving item ",e)
        }
    }
)
export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    async (name:string)=>{
        try {
            const response = await api.delete(`/delete/${name}`)
            return response.data;
        }catch (e){
            console.log("Error deleting item ",e)
        }
    }
)
export const updateItem = createAsyncThunk(
    'items/updateItem',
    async (item:IItem)=>{
        try {
            const response = await api.put(`/update/${item.name}`,item);
            return response.data;
        }catch (e){
            console.log("Error updating item ",e)
        }
    }
)
export const getAllItems = createAsyncThunk(
    'items/getAllItems',
    async ()=>{
        try {
            const response = await api.get('/view');
            return response.data;
        }catch (e){
            console.log("Error getting items ",e)
        }
    }
)
const itemSlice = createSlice({
    name:'items',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(saveItem.fulfilled,(state,action)=>{
                state.push(action.payload);
            })
            .addCase(saveItem.rejected, (_, action) => {
                console.error(action.payload);
            })
            .addCase(saveItem.pending, () => {
                console.log("pending Saving item...");
            })
        builder
            .addCase(deleteItem.fulfilled,(state,action)=>{
                return state.filter((item:IItem)=>item.id !== action.payload.name)
            })
            .addCase(deleteItem.rejected, (_, action) => {
                console.error(action.payload);
            })
            .addCase(deleteItem.pending, () => {
                console.log("Pending Deleting item...");
            })
        builder
            .addCase(updateItem.fulfilled,(state,action)=>{
                const item = state.find((item:IItem)=>item.name === action.payload.name);
                if (item){
                    item.id = action.payload.id;
                    item.name = action.payload.name;
                    item.price = action.payload.price;
                    item.quantity = action.payload.quantity;
                }
            })
            .addCase(updateItem.rejected, (_, action) => {
                console.error(action.payload);
            })
            .addCase(updateItem.pending, () => {
                console.log("pending Updating item...");
            })
        builder
            .addCase(getAllItems.fulfilled,(_,action)=>{
                return action.payload;
            })
            .addCase(getAllItems.rejected, (_, action) => {
                console.error(action.payload);
            })
            .addCase(getAllItems.pending, () => {
                console.log("Fetching items...");
            });
    }
})

export default itemSlice.reducer;