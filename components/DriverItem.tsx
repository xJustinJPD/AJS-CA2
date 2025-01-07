import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { DriverType, DriverTypeID } from '@/types';

interface MyProps {
    driver: DriverType;
}

export default function DriverItem({driver}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/drivers/[id]',
                params: { id: driver._id }
            }}><Text>{driver.firstname} {driver.lastname}</Text></Link>
            <Text>{driver.age}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 400
    }
});