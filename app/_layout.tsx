import {Stack} from "expo-router";
import {PaperProvider} from "react-native-paper";
import {store} from "../Store/Store";
import {Provider} from "react-redux";

function RootLayout() {
    return(
            <Provider store={store}>
                <PaperProvider>
                    <Stack>
                        <Stack.Screen name = 'index' options={{headerTitle:'Dashboard'}}/>
                        <Stack.Screen name = 'Customer'/>
                        <Stack.Screen name = 'Item'/>
                    </Stack>
                </PaperProvider>
            </Provider>
    )
}
export default RootLayout;