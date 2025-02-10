import {PaperProvider} from "react-native-paper";
import {View} from "react-native";
import {store} from "./Store/Store";
import {Provider} from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
        <PaperProvider>
          <View></View>
        </PaperProvider>
    </Provider>
  );
}
