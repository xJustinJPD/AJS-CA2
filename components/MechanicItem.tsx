import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MechanicType, MechanicTypeID } from '@/types';

interface MyProps {
    mechanic: MechanicType;
}

export default function MechanicItem({mechanic}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/mechanics/[id]',
                params: { id: mechanic._id }
            }}><Text>{mechanic.firstname} {mechanic.lastname}</Text></Link>
            <Text>{mechanic.age}</Text>
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