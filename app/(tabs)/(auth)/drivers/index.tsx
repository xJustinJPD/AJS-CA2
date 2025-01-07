import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DriverItem from '@/components/DriverItem';

import { DriverType, DriverTypeID } from '@/types';

import { Link } from 'expo-router';

export default function Tab() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    
    axios.get('https://ajsca-1.vercel.app/api/drivers')
         .then(response => {
          console.log(response.data);
          const driverData = response.data;
          setDrivers(driverData.filter((driver: DriverType) => driver.deleted === false));
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(drivers.length === 0) return <Text>No Drivers found</Text>
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={{ height: 10 }} />
      <Link href={{
                pathname: '/drivers/create'
            }}>
                <Button 
                    title="New Driver"
                    color="#008F11"
                />
        </Link>
        <View style={{ height: 20 }} />
        <FlatList
          data={drivers}
          renderItem={({item}) => <DriverItem driver={item} />}
          keyExtractor={(driver: DriverTypeID) => driver._id}
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
