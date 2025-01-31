import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screens/ChatScreen";
import ContactScreen from "../screens/ContactScreen";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BottomTabNavigation() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

    const handlebuttonPress = () => {
        navigation.navigate('Setting');
    }

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/icons/chat.png')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={handlebuttonPress}>
                            <Image
                                source={require('../assets/icons/setting.png')}
                                style={styles.headerIcon}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/icons/user.png')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerIcon: {
        width: 25,
        height: 25,
        tintColor: 'black',
        marginRight: 10,
    },
});
