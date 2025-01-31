import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { supabase } from '../supabase/supabaseClient';

export default function SettingScreen() {
    const navigation = useNavigation();

    const navigateEditProfile = () => {
        navigation.navigate('EditProfile');
    }
    const navigateChangePassword = () => {
        navigation.navigate('ChangePassword');
    }
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>

                <TouchableOpacity onPress={navigateEditProfile}>
                    <Text style={styles.text}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>

                <TouchableOpacity onPress={navigateChangePassword}>
                    <Text style={styles.text}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>

                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingLeft: 30
    },
    textContainer: {
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

});
