import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import database from "../data/database";

export default function ChatScreen() {
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const notedata = database.collections.get('notes');
            const allNotes = await notedata.query().fetch();
            setNotes(allNotes);
            console.log("Fetched Notes: ", allNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    const handleAddNotePress = () => {
        navigation.navigate('TestScreen', { refreshNotes: getNotes });
    }

    const handleDeleteAllNotes = async () => {
        try {
            await database.write(async () => {
                const notedata = database.collections.get('notes');
                const allNotes = await notedata.query().fetch();
                await Promise.all(allNotes.map(note => note.destroyPermanently()));
                console.log("All Notes Deleted");
            });
            getNotes();
        } catch (error) {
            console.error("Error deleting all notes:", error);
        }
    }
    return (
        <View>
            <Text>Welcome to App ChatScreen</Text>

            {notes.map((note) => (
                <View key={note.id}>
                    <Text>{note.title}</Text>
                    <Text>{note.content}</Text>
                </View>
            ))}
            <Button title="Add Note" onPress={handleAddNotePress} />
            <View style={{ paddingTop: 10 }}>
                <Button title="Delete All Notes" onPress={handleDeleteAllNotes} />
            </View>

        </View>
    );
}
