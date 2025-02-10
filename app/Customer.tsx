import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ICustomer from "../Model/ICustomer";
import { deleteCustomer, getAllCustomers, saveCustomer, updateCustomer } from "../Reducers/CustomerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Store/Store";
import {TextInput, Button, Card, DataTable} from "react-native-paper";

 function Customer() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const customers = useSelector((state) => state.customers);

    useEffect(() => {
        if (customers.length === 0) {
            dispatch(getAllCustomers());
        }
    }, [dispatch, customers.length]);

    function handleAdd() {
        const newCustomer = new ICustomer(id, name, nic, email, phone);
        dispatch(saveCustomer(newCustomer));
        resetForm();
    }

    const handleEdit = (customer:ICustomer) => {
        setId(customer.id);
        setName(customer.name);
        setNic(customer.nic);
        setEmail(customer.email);
        setPhone(customer.phone);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        const updatedCustomer = new ICustomer(id, name, nic, email, phone);
        dispatch(updateCustomer(updatedCustomer));
        resetForm();
    };

    const handleDelete = () => {
        dispatch(deleteCustomer(id));
        resetForm();
    };

    const resetForm = () => {
        setId("");
        setName("");
        setNic("");
        setEmail("");
        setPhone("");
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Management</Text>

            <TextInput label="Customer ID"
                 value={id}
                 onChangeText={setId}
                 style={styles.input}
              />
            <TextInput label="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput label="NIC"
                value={nic}
                onChangeText={setNic}
                style={styles.input}
            />
            <TextInput label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput label="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
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
                    Add Customer
                </Button>
            )}

            <Button mode="contained" onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
                Delete Customer
            </Button>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title> Name</DataTable.Title>
                    <DataTable.Title> NIC</DataTable.Title>
                    <DataTable.Title> Email</DataTable.Title>
                    <DataTable.Title> Phone</DataTable.Title>
                </DataTable.Header>
                <FlatList
                    data={customers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleEdit(item)}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                    <Text style={styles.cardText}>NIC: {item.nic}</Text>
                                    <Text style={styles.cardText}>Email: {item.email}</Text>
                                    <Text style={styles.cardText}>Phone: {item.phone}</Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </DataTable>
        </View>
    );
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
export default Customer;
