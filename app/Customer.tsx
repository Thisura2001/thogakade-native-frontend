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
        const newCustomer = new ICustomer(id, name, email, phone);
        dispatch(saveCustomer(newCustomer));
        resetForm();
    }

    const handleEdit = (customer:ICustomer) => {
        setId(customer.id);
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        const updatedCustomer = new ICustomer(id, name, email, phone);
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
            <TextInput label="Name"
                value={name}
                onChangeText={setName}
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
            <View style={styles.tableContainer}>
                <DataTable>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title> Name</DataTable.Title>
                        <DataTable.Title> Email</DataTable.Title>
                        <DataTable.Title> Phone</DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                        data={customers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                                <DataTable.Row style={styles.tableRow}>
                                    <DataTable.Cell>{item.name}</DataTable.Cell>
                                    <DataTable.Cell>{item.email}</DataTable.Cell>
                                    <DataTable.Cell>{item.phone}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <Button onPress={() => handleEdit(item)}>Edit</Button>
                                    </DataTable.Cell>
                                </DataTable.Row>
                        )}
                    />
                </DataTable>
            </View>
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
    tableContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: 8,
        marginTop: 20,
    },
    tableHeader: {
        backgroundColor: "#0e0c0c",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingVertical: 2,
    },
    tableRow: {
        backgroundColor: "#515cb4",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
});
export default Customer;
