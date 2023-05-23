import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './DetailsScreenStyles';

const BackIcon = props => <Icon {...props} name="arrow-back" />;
const SaveIcon = props => <Icon {...props} name="checkmark-outline" />;

export const DetailsScreen = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      accessibilityLabel="Go to home screen"
      icon={BackIcon}
      onPress={navigateBack}
      style={styles.backButton}
    />
  );

  const saveLocation = async () => {
    try {
      const locations = await AsyncStorage.getItem('locations');
      const parsedLocations = locations != null ? JSON.parse(locations) : [];

      parsedLocations.push({name, description, location});

      await AsyncStorage.setItem('locations', JSON.stringify(parsedLocations));

      navigateBack();
    } catch (error) {
      // Saving error
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="Details Screen"
        alignment="center"
        accessoryLeft={BackAction}
        accessibilityRole="header"
      />
      <Divider />
      <Layout style={styles.contentContainer}>
        <Text category="h1" style={styles.heading} accessibilityRole="header">
          Details
        </Text>
        <Input
          label="Name"
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Input
          label="Description"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={styles.input}
        />
        <Input
          label="Location"
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        <Button
          accessoryRight={SaveIcon}
          onPress={saveLocation}
          style={styles.saveButton}
          accessibilityLabel="Save the details">
          Save
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
