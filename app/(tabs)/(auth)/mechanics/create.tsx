import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, Button, Image, View } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { MechanicType } from '@/types';

export default function Page() {
    const router = useRouter();
    const { session } = useSession();
    const [form, setForm] = useState<MechanicType>({
        _id: '',
        firstname: '',
        lastname: '',
        age: '',
        deleted: false,
        cars: []
    });

    const { postRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = async () => {
        console.log(form);

        const formData = new FormData();
        formData.append('firstname', form.firstname);
        formData.append('lastname', form.lastname);
        formData.append('age', form.age);
        formData.append('cars', JSON.stringify(form.cars));

        console.log(formData);

        try {
            postRequest('https://ajsca-1.vercel.app/api/mechanics', formData, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session}`,
                    'Content-Type': 'multipart/form-data',
                },
            }, (data) => {
                router.push(`/mechanics/${data._id}`);
            });
        } catch (error) {
            console.error('Error uploading image and or form:', error);
        }
    };

    if(loading === true) return <Text>Loading Page...</Text>
    
    return (
        <View style={styles.container}>
            <Text>First Name</Text>
            <TextInput
                style={styles.input}
                placeholder='First Name'
                value={form.firstname}
                onChange={handleChange}
                id='firstname'
            />

            <Text>Last Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Last Name'
                value={form.lastname}
                onChange={handleChange}
                id='lastname'
            />

            <Text>Age</Text>
            <TextInput
                style={styles.input}
                placeholder='Age'
                value={form.age}
                onChange={handleChange}
                id='age'
            />
            

            <Text>{error}</Text>

            <Button 
                onPress={handleSubmit}
                title="Submit"
                color="#841584"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10
    },
    picker: {
        height: 50,
        width: 300,
        marginBottom: 16,
        marginTop: 16,
      },
      mechanicText: {
        fontSize: 16,
        marginTop: 8,
      },
      driverText: {
        fontSize: 16,
        marginTop: 8,
      },
      Button: {
        marginTop: 16,
        marginBottom: 16,
        width: 300,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});