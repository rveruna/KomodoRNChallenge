import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
} from 'react-native';
import {
  Icon,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './HomeScreenStyles';

const AddIcon = props => <Icon {...props} name="plus-outline" />;

export const HomeScreen = ({navigation}) => {
  const [locations, setLocations] = useState([]);

  const loadLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem('locations');

      setLocations(storedLocations != null ? JSON.parse(storedLocations) : []);
    } catch (error) {
    } finally {
    }
  };

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const NavigationButton = () => (
    <TopNavigationAction icon={AddIcon} onPress={navigateDetails} />
  );


  const renderLocations = () => {
    return (
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="Home Screen"
        alignment="center"
        accessoryRight={NavigationButton}
      />
      <Divider />
      <Layout style={styles.contentContainer}>
        <Text category="h1" style={styles.heading}>
          Locations
        </Text>
        {renderLocations()}
      </Layout>
    </SafeAreaView>
  );
};
