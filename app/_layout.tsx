import {Stack} from "expo-router";

function RootLayout() {
    return(
        <Stack>
            <Stack.Screen name = 'index' options={{headerTitle:'Dashboard'}}/>
            <Stack.Screen name = 'Customer'/>
            <Stack.Screen name = 'Item'/>
        </Stack>
    )
}
export default RootLayout;