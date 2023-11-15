import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import firebase from '../config';
import { HomeScreenOwnerNavigationProp } from '../types';

type Props = {
  navigation: HomeScreenOwnerNavigationProp;
};

// Define the structure of the user data you expect.
type UserData = {
  Businessname: string;
  // Include other user fields that you might need
};

const HomeScreenOwner: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<UserData>({ Businessname: '' });

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser?.uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data() as UserData);
        } else {
          console.log('user does not exist');
        }
      }, error => {
        console.error('Firestore snapshot error:', error);
      });

    // Unsubscribe from the snapshot listener when the component unmounts
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
      alert('Sign out failed!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>
        Hello, {name.Businessname}

        Welcome to your Edudeals Store
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your styles for the container
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    // Add other styles for the welcome text
  },
  // Add styles for other components if needed
});

export default HomeScreenOwner;
