import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CarType } from '@/types';
import useAPI from '@/hooks/useAPI' 
import { DriverType, MechanicType } from '@/types';
import axios from 'axios';

export default function Page() {
    const router = useRouter();
    const [car, setCar] = useState<CarType | null>(null);
    const { session } = useSession();
    const { id } = useLocalSearchParams();
        const [mechanics, setMechanics] = useState<MechanicType[]>([]);
        const [drivers, setDrivers] = useState<DriverType[]>([]);
        const [selectedMechanic, setSelectedMechanic] = useState<string>('');
        const [selectedDriver, setSelectedDriver] = useState<string>('');

    const [form, setForm] = useState<CarType>({
        make: '',
        model: '',
        year: 0,
        deleted: false,
        image_path: '',
        mechanics: [],
        drivers: [],
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

    useEffect(() => {
            
        axios.get('https://ajsca-1.vercel.app/api/mechanics')
            .then(response => {
            console.log(response.data);
            setMechanics(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    
    }, []);

    useEffect(() => {
        
        axios.get('https://ajsca-1.vercel.app/api/drivers')
            .then(response => {
            console.log(response.data);
            setDrivers(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    
    }, []);


    const handleAddMechanic = () => {
            if (selectedMechanic && !form.mechanics.includes(selectedMechanic)) {
            setForm((prevForm) => ({
                ...prevForm,
                mechanics: [...prevForm.mechanics, selectedMechanic]
            }));
            setSelectedMechanic('');
            }
        };

        const handleAddDriver = () => {
            if (selectedDriver && !form.drivers.includes(selectedDriver)) {
            setForm((prevForm) => ({
                ...prevForm,
                drivers: [...prevForm.drivers, selectedDriver]
            }));
            setSelectedDriver('');
            }
        };

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(form);
        putRequest(`https://ajsca-1.vercel.app/api/cars/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            router.push(`/cars/${data._id}`);
        });
    }

    if(loading === true) return <Text>Loading Car...</Text>
    
    return (
        <View style={styles.container}>
            <Text>Make</Text>
            <TextInput
                style={styles.input}
                placeholder='Make'
                value={form.make}
                onChange={handleChange}
                id='make'
            />

            <Text>Model</Text>
            <TextInput
                style={styles.input}
                placeholder='Model'
                value={form.model}
                onChange={handleChange}
                id='model'
            />

            <Text>Year</Text>
            <TextInput
                style={styles.input}
                placeholder='Year'
                value={form.year.toString()}
                onChange={handleChange}
                id='year'
            />

<Picker
                    selectedValue={selectedMechanic}
                    onValueChange={(itemValue) => setSelectedMechanic(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a mechanic" value="" />
                    {mechanics.map((mechanic: MechanicType) => (
                    <Picker.Item
                        key={mechanic._id}
                        label={mechanic.firstname}
                        value={mechanic._id}
                    />
                    ))}
                </Picker>

                {/* Adding Selected mechanic */}
                    <Button onPress={handleAddMechanic} title="Add Mechanic" />

                    <Picker
                    selectedValue={selectedDriver}
                    onValueChange={(itemValue) => setSelectedDriver(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a driver" value="" />
                    {drivers.map((driver: DriverType) => (
                    <Picker.Item
                        key={driver._id}
                        label={driver.firstname}
                        value={driver._id}
                    />
                    ))}
                </Picker>
                

                {/* Adding Selected driver */}
                    <Button onPress={handleAddDriver} title="Add Driver" />
                    <View style={{ height: 20 }} />

                {/* Display mechanics */}
                <Text><b>Selected Mechanics:</b></Text>
                <View style={{ height: 10 }} />
                <Text>{form.mechanics.join(', ')}</Text>
                <View style={{ height: 20 }} />

                <Text><b>Selected Drivers:</b></Text>
                <View style={{ height: 10 }} />
                <Text>{form.drivers.join(', ')}</Text>
            

                <View style={{ height: 20 }} />

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
