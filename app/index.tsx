import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Button, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>DashBoard</Text>
            <Card style={styles.card}>
                <Card.Content style={styles.CustomerCard}>
                    <Text style={styles.cardHeader}>Customers</Text>
                    <MaterialCommunityIcons style={styles.icons} name="account-group" size={40} color="white" />
                    <Text style={styles.cardBody}>
                        Manages customer records, allowing adding, viewing, editing, and removing customer data efficiently in applications.
                    </Text>
                    <Link style={styles.link} href="/Customer">
                        Go to Customer
                    </Link>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content style={styles.ItemsCard}>
                    <Text style={styles.cardHeader}>Items</Text>
                    <MaterialCommunityIcons style={styles.icons} name="package-variant" size={40} color="white" />
                    <Text style={styles.cardBody}>
                        Manages product inventory, allowing adding, viewing, editing, and removing items efficiently in applications.
                    </Text>
                    <Link style={styles.link} href="/Item">
                        Go to Items
                    </Link>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content style={styles.PlaceOrderCard}>
                    <Text style={styles.cardHeader}>Place Order</Text>
                    <MaterialCommunityIcons style={styles.icons} name="cart-plus" size={40} color="white" />
                    <Text style={styles.cardBody}>
                        Create and manage orders, allowing customers to place orders and track their status efficiently.
                    </Text>
                    <Link style={styles.link} href="/PlaceOrder">
                        Go to Place Order
                    </Link>
                </Card.Content>
            </Card>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#8558d3",
        marginBottom: 10,
    },
    card: {
        width: "90%",
        marginBottom: 15,
    },
    icons: {
        textAlign: "center",
        marginVertical: 5,
    },
    CustomerCard: {
        backgroundColor: "green",
        borderRadius: 15,
        padding: 15,
    },
    ItemsCard: {
        backgroundColor: "#FFA500",
        borderRadius: 15,
        padding: 15,
    },
    PlaceOrderCard: {
        backgroundColor: "#007BFF",
        borderRadius: 15,
        padding: 15,
    },
    cardHeader: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    cardBody: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginVertical: 5,
    },
    link: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginTop: 5,
    },
});
