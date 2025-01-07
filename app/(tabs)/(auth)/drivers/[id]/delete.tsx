import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DriverType, DriverTypeID } from '@/types';
import useAPI from '@/hooks/useAPI' 
import axios from 'axios';

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
            axios.delete(`https://ajsca-1.vercel.app/api/drivers/${id}`, {
                headers: {
                    Authorization: `Bearer ${session}`
                }
            })
            
            router.push(`/drivers`);
            
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <>
            <Text>Are you sure you want to delete?</Text>
            <Text>{driver?.firstname}</Text>
            <Text>{driver?.lastname}</Text>
            
            <Text>{error}</Text>

            {/* <Button 
                onPress={handleDelete}
                title="Confirm Delete"
                color="#841584"
            /> */}

            <Button 
                onPress={handleSubmit}
                title="Delete"
                color="#841584"
            />
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10
    }
});