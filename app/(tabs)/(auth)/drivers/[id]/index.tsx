import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';

import { useLocalSearchParams } from 'expo-router';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { DriverType, DriverTypeID } from '@/types';


export default function Tab() {
  const [driver, setDriver] = useState<DriverType | null>(null);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    
    axios.get(`https://ajsca-1.vercel.app/api/drivers/${id}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3RpbnBkQGdtYWlsLmNvbSIsImZ1bGxfbmFtZSI6Ikp1c3RpbiIsIl9pZCI6IjY3MzhjMDVhYmQ0OWRmMWM3NDZkMmQ2MCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzIyNjQ2Nn0.xhq-FWsgib4X-r_wcchdQ8DGTK4eEf8bZl3yLFR2K-o'
            }
        })
        .then(response => {
            console.log(response.data);
            setDriver(response.data.data);
        })
        .catch(e => {
            console.log(e);
        });

  }, [id]);


  if(!driver) return <Text>Driver not found</Text>
  
  return (
            <View style={styles.container}>
                <Text>{driver?.firstname}</Text>
                <Text>{driver?.lastname}</Text>
                <View style={{ height: 10 }} />
                <Text>{driver?.age}</Text>
                <View style={{ height: 10 }} />
                <Link href={{
                                pathname: '/drivers/[id]/edit',
                                params: { id: driver._id }
                            }}><Button 
                            title="Edit"
                            color="#0000FF"
                        /></Link>
                        <View style={{ height: 10 }} />
                            <Link href={{
                                pathname: '/drivers/[id]/delete',
                                params: { id: driver._id }
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
});
