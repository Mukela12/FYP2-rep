
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Button,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';


const categories = ["Food", "Rent", "Entertainment", "Miscellaneous"];

const ExpenseCalculatorScreen = ({ navigation }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [expenses, setExpenses] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleAddExpense = () => {
    if (inputValue !== '') {
      const newExpense = { amount: parseFloat(inputValue), category: selectedCategory };
      setExpenses([...expenses, newExpense]);
      setInputValue('');
      setTotalExpenses(prev => prev + newExpense.amount);
      ToastAndroid.showWithGravity(
        `Expense of $${newExpense.amount} added`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const handleDeleteExpense = (indexToDelete: number) => {
    setExpenses(prev => prev.filter((_, index) => index !== indexToDelete));
    setTotalExpenses(prev => prev - expenses[indexToDelete].amount);
  };

  const calculateSpendingHabit = () => {
    let spendingSummary = categories.reduce((acc, category) => {
      acc[category] = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return acc;
    }, {} as Record<string, number>);

    // Display the spendingSummary. You can enhance this further.
    console.log(spendingSummary);
  };

  return (
    <View style={styles.ScreenContainer}>

      <Text style={styles.ScreenTitle}>Monthly Expense Calculator</Text>

      <View style={styles.CategoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.CategoryButton,
              category === selectedCategory && styles.CategoryButtonActive
            ]}
          >
            <Text style={[
                    styles.CategoryText
                  ]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.InputContainerComponent}>
        <TextInput
          placeholder="   Enter expense amount"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
        <TouchableOpacity onPress={handleAddExpense}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ExpenseListContainer}>
        {expenses.map((expense, index) => (
          <View key={index} style={styles.ExpenseItem}>
            <Text style={styles.ExpenseText}>RM{expense.amount} - {expense.category}</Text>
            <TouchableOpacity onPress={() => handleDeleteExpense(index)}>
              <Text style={styles.DeleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity onPress={calculateSpendingHabit}>
        <Text style={styles.AnalyzeButton}>Analyze Spending Habit</Text>
      </TouchableOpacity>

      <View style={styles.TotalContainer}>
        <Text style={styles.TotalText}>Total Expenses: ${totalExpenses}</Text>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
    paddingTop: SPACING.space_20,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  ExpenseListContainer: {
    paddingHorizontal: SPACING.space_30,
    paddingBottom: SPACING.space_20,
  },
  ExpenseItem: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    padding: SPACING.space_15,
    marginVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_10,
  },
  ExpenseText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  TotalContainer: {
    padding: SPACING.space_30,
  },
  TotalText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  AnalyzeButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    textAlign: 'center',
    padding: SPACING.space_15,
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },

  CategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SPACING.space_15,
    borderBottomWidth: 1,
    borderColor: COLORS.primaryLightGreyHex,
  },
  CategoryButton: {
    padding: SPACING.space_10,
  },
  CategoryButtonActive: {
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  DeleteButton: {
    color: 'red',
    textAlign: 'right',
  },
  // ... (existing styles)
});

export default ExpenseCalculatorScreen;
