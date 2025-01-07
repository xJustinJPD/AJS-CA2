import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button, Image, View } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI'
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { DriverType, MechanicType } from '@/types';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function Page() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const { session } = useSession();
    const [mechanics, setMechanics] = useState<MechanicType[]>([]);
    const [drivers, setDrivers] = useState<DriverType[]>([]);
    const [selectedMechanic, setSelectedMechanic] = useState<string>('');
    const [selectedDriver, setSelectedDriver] = useState<string>('');
    const [form, setForm] = useState<{
        make: string;
        model: string;
        year: string;
        // image: string;
        mechanics: string[];
        drivers: string[];
    }>({
        make: '',
        model: '',
        year: '',
        // image: "",
        mechanics: [],
        drivers: []
    });

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

    const { postRequest, data, loading, error } = useAPI();

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    // const handlePickImage = async () => {
    //     // Request permission to access the gallery
    //     let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     // continues if permission is granted and alerts if not
    //     if (permission.granted) {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //             quality: 1,
    //             mediaTypes: ["images"],
    //         });

    //         if (!result.canceled) {
    //             setImage(result.assets[0].uri);
    //         }
    //     } else {
    //         alert("Permission to access the camera roll is required!");
    //     }
    // };

    const handleSubmit = async () => {
        console.log(form);

        const formData = new FormData();
        formData.append('make', form.make);
        formData.append('model', form.model);
        formData.append('year', form.year);
        formData.append('mechanics', JSON.stringify(form.mechanics));
        formData.append('drivers', JSON.stringify(form.drivers));

        console.log(formData);

		// if (image) {
        //     // fetch the image and blob it
        //     // blob is a file-like object of immutable, raw data. Necessary for image upload
		// 	const response = await fetch(image);
		// 	const blob = await response.blob();
        //     // append the image to the form data with a name and a timestamp to make it unique. Even though the backend makes it unique but just to understand the process i did it this way + it didnt work otherwise
		// 	formData.append("image", blob, `image-${Date.now()}.jpg`);
		// }

        try {
            postRequest('https://ajsca-1.vercel.app/api/cars', form, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session}`,
                    'Content-Type': 'multipart/form-data',
                },
            }, (data) => {
                router.push(`/cars/${data._id}`);
            });
        } catch (error) {
            console.error('Error uploading image and or form:', error);
        }
    };

    if(loading === true) return <Text>Loading API...</Text>
    
    return (
        <View style={styles.container}>
            <Text>Male</Text>
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
                value={form.year}
                onChange={handleChange}
                id='year'
            />

            {/* <Text>Image</Text>
            <Button title="Pick an image" onPress={handlePickImage} />
			{image && (
				<Image
					source={{ uri: image }}
					style={{ width: 50, height: 50, margin: 10 }}
				/>
			)} */}

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