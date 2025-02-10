import {StyleSheet, Text, View} from "react-native";
import IItem from "../Model/IItem";
import {deleteItem, getAllItems, saveItem, updateItem} from "../Reducers/ItemSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../Store/Store";

export default function Item(){
    const [id, setItemId] = useState("")
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector(state => state.items);

    useEffect(() => {
        if (items.length === 0){
            dispatch(getAllItems())
        }
    }, [dispatch,items.length]);

    const handleAdd = () => {
        const newItem = new IItem(id,name,quantity,price)
        dispatch(saveItem(newItem))
        resetForm()
    }

    const handleEdit = (item:IItem) => {
        setItemId(item.id)
        setName(item.name)
        setQuantity(item.quantity)
        setPrice(item.price)
        setIsEditing(true)
    }

    const handleUpdate = () => {
        const updated = new IItem(id,name,quantity,price)
        dispatch(updateItem(updated))
        resetForm()
    }

    const handleDelete = () => {
        dispatch(deleteItem(id))
    }

    const resetForm = () => {
        setItemId("")
        setName("")
        setQuantity("")
        setPrice("")
        setIsEditing(false)
    }

    return(
        <View style={style.container}>
            <Text>Item Manage</Text>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});