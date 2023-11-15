import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface DiscountCardProps {
  name: string;
  description: string;
  imagelink_square: any; // Since this is a local image, we use any or a specific image type
  special_ingredient: string;
  prices: { price: string, currency: string };
  average_rating: number;
  ratings_count: string;
}

const DiscountCard: React.FC<DiscountCardProps> = ({
  name,
  description,
  imagelink_square,
  special_ingredient,
  prices,
  average_rating,
  ratings_count,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={imagelink_square} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.specialIngredient}>{special_ingredient} {prices.price}{prices.currency}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{average_rating}</Text>
          <Text style={styles.ratingsCount}>{ratings_count} ratings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  specialIngredient: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  ratingsCount: {
    fontSize: 14,
    color: '#666',
  },
});

export default DiscountCard;
