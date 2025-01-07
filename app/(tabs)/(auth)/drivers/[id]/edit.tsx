import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button, View } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DriverTypeID, DriverType } from '@/types';
import useAPI from '@/hooks/useAPI' 

export default function Page() {
    const router = useRouter();
    const [driver, setDriver] = useState<DriverType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams();

    const [form, setForm] = useState<DriverType>({
        firstname: '',
        lastname: '',
        age: '',
        deleted: false
    });
    const { getRequest, putRequest, data, loading, error } = useAPI();


    useEffect(() => {
        getRequest(`https://ajsca-1.vercel.app/api/drivers/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            setDriver(data.data as DriverType);
            setForm(data.data);
        })
    }, [id]);

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(form);
        putRequest(`https://ajsca-1.vercel.app/api/drivers/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/drivers/${data._id}`);
        });
    }

    if(loading === true) return <Text>Loading Driver...</Text>
    
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