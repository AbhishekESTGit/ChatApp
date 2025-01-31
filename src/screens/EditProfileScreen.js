import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../supabase/supabaseClient';
import { useFocusEffect } from '@react-navigation/native';

const EditProfileScreen = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const fetchUserData = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            Alert.alert('Error', 'Unable to fetch user');
            return;
        }

        if (data) {
            setEmail(data.user.email);
            const { data: userDetails, error: userError } = await supabase
                .from('user_details')
                .select('*')
                .eq('email', data.user.email)
                .single();

            if (userDetails) {
                setName(userDetails.name);
                setAddress(userDetails.address);
                setPhone(userDetails.phone);
            } else if (userError) {
                console.error('Error fetching user details: ', userError);
            }
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUserData();
        }, [])
    );

    const handleSaveDetails = async () => {
        if (!name || !address || !phone) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const { error } = await supabase
                .from('user_details')
                .upsert([
                    { email, name, address, phone }
                ], {
                    onConflict: ['email']
                });

            if (error) throw error;

            Alert.alert('Success', 'Your details have been saved!');

        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                editable={false}
            />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                editable={false}
            />

            <TouchableOpacity style={styles.button} onPress={handleSaveDetails}>
                <Text style={styles.buttonText}>Save Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;
