import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
      <View style={style.container}>
        <Text>DashBoard</Text>
          <Link href="/Customer">Go to Customer</Link>
      </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});