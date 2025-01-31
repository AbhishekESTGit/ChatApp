import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Text, TextInput, View } from "react-native";
import { useState } from "react";
import database from "../data/database";

export default function TestScreen() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigation = useNavigation();
    const route = useRoute();

    const { refreshNotes } = route.params;
    const handleSaveNote = async () => {
        try {
            await database.write(async () => {
                const newNote = await database.collections.get('notes').create((note) => {
                    note.title = title;
                    note.content = content;
                });
                console.log("New Note Added:", newNote);
            });
            refreshNotes();
            navigation.goBack();
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }

    return (
        <View>
            <Text>Add New Note</Text>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Save Note" onPress={handleSaveNote} />
        </View>
    );
}