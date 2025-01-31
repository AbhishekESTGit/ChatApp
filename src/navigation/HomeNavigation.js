import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./BottomTabNavigation";
import TestScreen from "../screens/TestScreen";
import App from "../../App";
import UserProfileScreen from "../screens/UserProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import { supabase } from '../supabase/supabaseClient';
import { useEffect, useState } from "react";
import { Text, Alert } from "react-native";

const HomeNavigation = () => {
    const Stack = createNativeStackNavigator();
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndCheckDetails = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) throw error;

                if (data) {
                    setEmail(data.user.email);
                }

                if (data?.user?.email) {
                    const { data: userDetails, error: userError } = await supabase
                        .from('user_details')
                        .select('*')
                        .eq('email', data.user.email)
                        .single();
                    if (userError || !userDetails) {
                        setIsFirstLogin(true);
                    } else {
                        setIsFirstLogin(false);
                    }
                }

            } catch (error) {
                console.error('Error fetching user or checking details: ', error);
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndCheckDetails();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Stack.Navigator initialRouteName={isFirstLogin ? "userProfile" : "Home"}>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabNavigation} />
            <Stack.Screen name="userProfile" component={UserProfileScreen} />
            <Stack.Screen name="TestScreen" component={TestScreen} />
            <Stack.Screen name="App" component={App} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
};

export default HomeNavigation;
