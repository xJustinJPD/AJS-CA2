import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { CarType, CarTypeID } from '@/types';


export default function Tab() {
  const [car, setCar] = useState<CarType | null>(null);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    
    axios.get(`https://ajsca-1.vercel.app/api/cars/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3RpbnBkQGdtYWlsLmNvbSIsImZ1bGxfbmFtZSI6Ikp1c3RpbiIsIl9pZCI6IjY3MzhjMDVhYmQ0OWRmMWM3NDZkMmQ2MCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzIyNjQ2Nn0.xhq-FWsgib4X-r_wcchdQ8DGTK4eEf8bZl3yLFR2K-o'
            }
        })
        .then(response => {
            console.log(response.data);
            setCar(response.data);
        })
        .catch(e => {
            console.log(e);
        });

  }, [id]);


  if(!car) return <Text>Loading....</Text>
  
  return (
        <View style={styles.container}>
            <Text>{car.make}</Text>
            <Text>{car.model}</Text>
            <View style={{ height: 10 }} />
            <Text>{car.year}</Text>
            <View style={{ height: 10 }} />
            <Text><b>Mechanics:</b></Text>
            {car?.mechanics?.length === 0 ? (
              <Text>No Mechanics found</Text>
            ) : (
              <Text>{car?.mechanics ? car.mechanics.join(', ') : 'No mechanics available'}</Text>
            )}
            <Text><b>Drivers:</b> </Text>
            {car?.drivers?.length === 0 ? (
              <Text>No drivers found</Text>
            ) : (
              <Text>{car?.drivers ? car.drivers.join(', ') : 'No drivers available'}</Text>
            )}
            <View style={{ height: 10 }} />
            <Link href={{
                            pathname: '/cars/[id]/edit',
                            params: { id: car._id }
                        }}><Button 
                        title="Edit"
                        color="#0000FF"
                    /></Link>
                    <View style={{ height: 10 }} />
                        <Link href={{
                            pathname: '/cars/[id]/delete',
                            params: { id: car._id }
                        }}><Button 
                        title="Delete"
                        color="#FF0000"
                    /></Link>
    
    
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
