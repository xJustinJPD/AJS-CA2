import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MechanicItem from '@/components/MechanicItem';
import { Picker } from '@react-native-picker/picker';

import { MechanicType, MechanicTypeID } from '@/types';

import { Link } from 'expo-router';

export default function Tab() {
  const [mechanics, setMechanics] = useState([]);

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

  if(mechanics.length === 0) return <Text>No Mechanics found</Text>
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={{ height: 10 }} />
      <Link href={{
                pathname: '/mechanics/create'
            }}>
        <Button 
                    title="New Mechanic"
                    color="#008F11"
                />
        </Link>
        <View style={{ height: 20 }} />
        <FlatList
          data={mechanics}
          renderItem={({item}) => <MechanicItem mechanic={item} />}
          keyExtractor={(mechanic: MechanicTypeID) => mechanic._id}
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
