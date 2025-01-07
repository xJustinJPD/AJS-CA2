import { View, Text, StyleSheet, Button } from 'react-native';
import LoginForm from '@/components/LoginForm';
import { useSession } from '@/contexts/AuthContext';
import { IAuthContext } from '@/types';

export default function Tab() {
  const { session, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text><b>Login/Logout</b></Text>
      <View style={{ height: 10 }} />
      {(session) ? (
        <Button 
          onPress={signOut}
          title="Logout"
          color="#841584"
        />
      ) : (
        <LoginForm />
      )}

      
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
