import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SingupScreen from "../screens/SingupScreen";

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Singup" options={{ headerShown: false }} component={SingupScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;
