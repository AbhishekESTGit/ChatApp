import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { database } from '../watermelonDB/database';
const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    const insertContactsToDB = async () => {
        const contactsToInsert = [
            { name: 'John Doe', phone: '9109452170', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
            { name: 'Jane Smith', phone: '6265620799', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
            { name: 'Sara Lee', phone: '9876543212', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
            { name: 'Michael Brown', phone: '9876543213', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
            { name: 'Emily White', phone: '9876543214', image: 'https://randomuser.me/api/portraits/women/5.jpg' },
        ];

        const contactCollection = database.collections.get('contacts');

        await database.write(async () => {
            // Loop over each contact to check if it already exists in the DB
            for (let contact of contactsToInsert) {
                const existingContact = await contactCollection.query(
                    Q.where('phone', contact.phone)
                ).fetch();

                if (existingContact.length === 0) {
                    await contactCollection.create(contactData => {
                        contactData.name = contact.name;
                        contactData.phone = contact.phone;
                        contactData.image = contact.image;
                    });
                }
            }
        });
    };

    const fetchContactsFromDB = async () => {
        const contactCollection = database.collections.get('contacts');
        const allContacts = await contactCollection.query().fetch();

        const rawContacts = allContacts.map(contact => contact._raw);

        console.log("Contacts fetched from WatermelonDB:", rawContacts);

        setContacts(rawContacts);
    };


    useEffect(() => {
        insertContactsToDB();
        fetchContactsFromDB();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.contactCard}>
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
