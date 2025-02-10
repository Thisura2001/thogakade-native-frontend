import {StyleSheet, Text, View} from "react-native";

export default function Item(){
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