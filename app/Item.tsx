import {StyleSheet, Text, View} from "react-native";
import IItem from "../Model/IItem";
import {deleteItem, getAllItems, saveItem, updateItem} from "../Reducers/ItemSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../Store/Store";
import {Button, TextInput} from "react-native-paper";

function Item(){
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
        <View style={styles.container}>
            <Text style={styles.title}>Item Manage</Text>

            <TextInput label="Item ID"
                       value={id}
                       onChangeText={setItemId}
                       style={styles.input}
            />
            <TextInput label="Item Name"
                       value={name}
                       onChangeText={setName}
                       style={styles.input}
            />
            <TextInput label="Item Quantity"
                       value={quantity}
                       onChangeText={setQuantity}
                       style={styles.input}
            />
            <TextInput label="Item Price"
                       value={price}
                       onChangeText={setPrice}
                       style={styles.input}
            />

            {isEditing ? (
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={handleUpdate} style={styles.button}>
                        Update
                    </Button>
                    <Button mode="contained" onPress={resetForm} style={styles.button} buttonColor="gray">
                        Cancel
                    </Button>
                </View>
            ) : (
                <Button mode="contained" onPress={handleAdd} style={styles.button}>
                    Add Item
                </Button>
            )}

            <Button mode="contained" onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
                Delete Item
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#4A90E2",
    },
    input: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: "red",
    },
    card: {
        marginVertical: 8,
        backgroundColor: "#f8f9fa",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 14,
        color: "#555",
    },
});
export default Item;
