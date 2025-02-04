import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { database } from '../watermelonDB/database';
import { supabase } from '../supabase/supabaseClient';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const navigation = useNavigation();

    const fetchUserDataFromSupabase = async (phoneNumber) => {
        const { data, error } = await supabase
            .from('user_details')
            .select('*')
            .eq('phone', phoneNumber);

        if (error) {
            console.log("Error fetching data from Supabase:", error);
            return null;
        }

        return data;
    };

    const insertContactsToDB = async () => {
        const contactsToInsert = [
            { name: 'Alex Johnson', phone: '9109452170', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
            { name: 'Olivia Martinez', phone: '9981333588', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
            { name: 'William Harris', phone: '9876543201', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
            { name: 'Sophia Garcia', phone: '9123456780', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
            { name: 'James Williams', phone: '9109452160', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
            { name: 'Mia Brown', phone: '6234567801', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
            { name: 'Liam Lee', phone: '9876543220', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
            { name: 'Isabella Clark', phone: '9109452180', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
            { name: 'Ethan Scott', phone: '6234567811', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
        ];

        const contactCollection = database.collections.get('contacts');

        const existingContacts = await contactCollection.query().fetch();
        const existingPhoneNumbers = new Set(existingContacts.map(contact => contact.phone));

        const newContacts = contactsToInsert.filter(contact => !existingPhoneNumbers.has(contact.phone));

        if (newContacts.length > 0) {
            await database.write(async () => {
                for (let contact of newContacts) {
                    await contactCollection.create(contactData => {
                        contactData.name = contact.name;
                        contactData.phone = contact.phone;
                        contactData.image = contact.image;
                    });
                }
            });
            console.log(`${newContacts.length} new contacts inserted.`);
        } else {
            console.log("No new contacts to insert.");
        }
    };

    const fetchContactsFromDB = async () => {
        const contactCollection = database.collections.get('contacts');
        const allContacts = await contactCollection.query().fetch();

        const rawContacts = allContacts.map(contact => contact._raw);

        console.log("Contacts fetched from WatermelonDB:", rawContacts);

        setContacts(rawContacts);
    };

    const handleContactPress = async (contact) => {
        console.log("Navigation Click=======================================>")
        const userData = await fetchUserDataFromSupabase(contact.phone);

        if (userData && userData.length > 0) {
            navigateToChatScreen(userData[0]);
        } else {
            showInvitePopup(contact);
        }
    };

    const navigateToChatScreen = (userData) => {
        navigation.navigate('ChatScreen', { user: userData });
    };

    const showInvitePopup = (contact) => {
        console.log("Show Invite Alertbox");
        Alert.alert(
            'Invite to Chat',
            `${contact.name} is not on the platform. Would you like to invite them?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Invite', onPress: () => openShareSheet(contact) },
            ]
        );
    };
    const openShareSheet = (contact) => {
        const shareOptions = {
            title: 'Invite to Chat',
            message: `Hey, I would like to invite you to join our chat platform. Here's my contact: ${contact.phone}`,
            url: 'https://your-app-link.com',
        };

        Share.open(shareOptions)
            .then((res) => console.log('Share success:', res))
            .catch((err) => console.log('Error opening share sheet:', err));
    };


    useEffect(() => {
        insertContactsToDB();
        fetchContactsFromDB();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.contactCard} onPress={() => handleContactPress(item)}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f9f9f9',
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    contactPhone: {
        fontSize: 14,
        color: '#777',
    },
});

export default ContactList;
