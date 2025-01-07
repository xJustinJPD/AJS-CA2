import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button, View } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CarType } from '@/types';
import useAPI from '@/hooks/useAPI' 
import axios from 'axios';

export default function Page() {
    const router = useRouter();
    const [car, setCar] = useState<CarType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams();

    const [form, setForm] = useState<CarType>({
        make: '',
        model: '',
        year: 0,
        deleted: false,
        image_path: '',
        mechanics: [],
        drivers: []
    });
    const { getRequest, putRequest, data, loading, error } = useAPI();


    useEffect(() => {
        getRequest(`https://ajsca-1.vercel.app/api/cars/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            setCar(data as CarType);
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
            axios.delete(`https://ajsca-1.vercel.app/api/cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${session}`
                }
            })
            
            router.push(`/cars`);
            
    }

    if(loading === true) return <Text>Loading Car...</Text>
    
    return (
        <View style={styles.container}>
            <Text>Are you sure you want to delete?</Text>
            <Text>{car?.make}</Text>
            <Text>{car?.model}</Text>
            <Text>{car?.year}</Text>
            
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});