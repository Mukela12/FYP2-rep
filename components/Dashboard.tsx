import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import firebase from '../config';
import { HomeScreenNavigationProp } from '../types';  
import DiscountCard from '../components/DiscountCard'; // Assuming this is created similar to CoffeeCard
import DiscountData from '../Data/DiscountData';

type Props = {
  navigation: HomeScreenNavigationProp;
};

// Assuming DiscountData has a similar structure to UserData
type DiscountData = {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  // Include other discount-related fields
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<{ firstname: string }>({ firstname: '' });
  const [discounts, setDiscounts] = useState<DiscountData[]>([]);

  useEffect(() => {
    // Fetching user data
    const userUnsubscribe = firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser?.uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setName(snapshot.data() as { firstname: string });
        } else {
          console.log('User does not exist');
        }
      }, error => console.error('Firestore snapshot error:', error));

    // Fetching discount data
    const discountUnsubscribe = firebase.firestore().collection('discounts')
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          setDiscounts(snapshot.docs.map(doc => doc.data() as DiscountData));
        }
      }, error => console.error('Firestore snapshot error:', error));

    return () => {
      userUnsubscribe();
      discountUnsubscribe();
    };
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
      <Text style={styles.welcomeText}>Hello, {name.firstname}</Text>
      <FlatList
        data={DiscountData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscountCard
            name={item.name}
            description={item.description}
            imagelink_square={item.imagelink_square}
            special_ingredient={item.special_ingredient}
            prices={item.prices}
            average_rating={item.average_rating}
            ratings_count={item.ratings_count}
          />
        )}
      />
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Define your styles for the container
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    // Define other styles for the welcome text
  },
  // Define styles for other components if needed
});

export default HomeScreen;
