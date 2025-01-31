import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export default function ContactScreen() {
    const navigation = useNavigation();
    const handlebuttonPress = () => {
        navigation.navigate('App');
    }
    return (
        <View>
            <Text>Wetcome to App ContactScreen</Text>
            <Button title="AppButton" onPress={handlebuttonPress} />
        </View>
    );
}