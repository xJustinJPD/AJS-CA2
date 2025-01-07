import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MechanicType } from '@/types';
import useAPI from '@/hooks/useAPI' 
import axios from 'axios';

export default function Page() {
    const router = useRouter();
    const [mechanic, setMechanic] = useState<MechanicType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams();

    const [form, setForm] = useState<MechanicType>({
        firstname: '',
        lastname: '',
        age: '',
        deleted: false
    });
    const { getRequest, putRequest, data, loading, error } = useAPI();


    useEffect(() => {
        getRequest(`https://ajsca-1.vercel.app/api/mechanics/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            setMechanic(data as MechanicType);
            setForm(data);
        })
    }, [id]);

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
            axios.delete(`https://ajsca-1.vercel.app/api/mechanics/${id}`, {
                headers: {
                    Authorization: `Bearer ${session}`
                }
            })
            
            router.push(`/mechanics`);
            
    }

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <>
            <Text>Are you sure you want to delete?</Text>
            <Text>{mechanic?.firstname}</Text>
            <Text>{mechanic?.lastname}</Text>
            
            <Text>{error}</Text>

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