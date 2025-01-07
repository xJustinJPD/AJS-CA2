import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { CarType, CarTypeID } from '@/types';

interface MyProps {
    car: CarType;
}

export default function CarItem({car}: MyProps){

    const imageUrl = `https://jpdimagesbucket.s3.eu-north-1.amazonaws.com/${car.image_path}`;
    return (
        <View style={styles.item}>
            {car.image_path && <Image source={{ uri: car.image_path }} style={styles.image} />}
            <Link href={{
                pathname: '/cars/[id]',
                params: { id: car._id }
            }}><Text>{car.make}</Text></Link>
            <Text>{car.model}</Text>
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
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});