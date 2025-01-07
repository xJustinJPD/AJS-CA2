import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CarItem from '@/components/CarItem';

import { CarType, CarTypeID } from '@/types';

import { Link } from 'expo-router';

export default function Tab() {
  const [cars, setCars] = useState<CarType[]>([]);

  useEffect(() => {
    
    axios.get('https://ajsca-1.vercel.app/api/cars')
         .then(response => {
          const carData = response.data;
          setCars(carData.filter((car: CarType) => car.deleted === false));
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(cars.length === 0) return <Text>Loading...</Text>

  console.log(cars);
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={{ height: 10 }} />
      <Link href={{
                pathname: '/cars/create'
            }}>
                <Button 
                    title="New Car"
                    color="#008F11"
                />
        </Link>
        <View style={{ height: 20 }} />
        <FlatList
          data={cars}
          renderItem={({item}) => <CarItem car={item} />}
          keyExtractor={(car: CarTypeID) => car._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
