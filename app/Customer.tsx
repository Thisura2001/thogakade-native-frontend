import {Text, View,StyleSheet} from "react-native";
import {Link} from "expo-router";

export default function Customer(){
    return(
        <View style={style.container}>
            <Text>Customer Manage</Text>
            <Link href="/Item">Go to Items</Link>
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