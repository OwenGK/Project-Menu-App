import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  course: string;
}


function CombinedScreen() {
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<MenuItem>({
    id: '',
    name: '',
    description: '',
    price: '',
    course: '',
  });
  const [selectedCourse, setSelectedCourse] = useState("Hors D'Oeuvresr");

  
  useEffect(() => {
    console.log('Menu updated', menuItems);
  }, [menuItems]);

 
  function addItem() {
    const id = (menuItems.length + 1).toString();
    setMenuItems([...menuItems, { ...newItem, id, course: selectedCourse }]);
    setNewItem({ id: '', name: '', description: '', price: '', course: '' });
  }

  
  function renderMenuItem({ item }: { item: MenuItem }) {
    return (
      <View style={styles.menuItem}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>R{item.price}</Text>
        <Text>Course: {item.course}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Christoffel's Menu</Text>

      {/* Total Number of Items */}
      <Text style={styles.subHeader}>Total Menu Items: {menuItems.length}</Text>

      {/* Menu List - FlatList */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in the menu yet!</Text>
        }
        contentContainerStyle={styles.listContainer}
      />

      {/* Input Form */}
      <Text style={styles.formHeader}>Add New Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={newItem.name}
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dish Description"
        value={newItem.description}
        onChangeText={(text) => setNewItem({ ...newItem, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={newItem.price}
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
        keyboardType="numeric"
      />

      {/* Course Picker */}
      <Picker
        selectedValue={selectedCourse}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
      >
        <Picker.Item label="Hors D'Oeuvresr" value="Hors D'Oeuvres" />
        <Picker.Item label="Amuse-Bouche" value="Amuse-Bouche" />
        <Picker.Item label="Soup" value="Soup" />
        <Picker.Item label="Appetizer" value="Appetizer" />
        <Picker.Item label="Salad" value="Salad" />
        <Picker.Item label="Fish" value="Fish" />
        <Picker.Item label="First Main Course" value="First Main Course" />
        <Picker.Item label="Palate Cleanser" value="Palate Cleanser" />
        <Picker.Item label="Second Main Course" value="Second Main Course" />
        <Picker.Item label="Cheese Course" value="Cheese Course" />
        <Picker.Item label="Dessert" value="Dessert" />
        <Picker.Item label="Mignardise" value="Mignardise" />
      </Picker>

      {/* Save Button */}
      <TouchableHighlight
        style={styles.saveButton}
        underlayColor="#DDDDDD"
        onPress={addItem}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableHighlight>
    </View>
  );
}

// Styles in progress
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#A9E190',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    padding: 14,
    backgroundColor: '#DBF4AD',
  },
  listContainer: {
    flexGrow: 1,
    backgroundColor: '#F2F5E0',
    borderRadius: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#D0F093',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#DBF4AD',
    
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#A9E190',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#DBF4AD',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#DBF4AD',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#999',
  },
  saveButton: {
    backgroundColor: '#A9E190',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CombinedScreen;
