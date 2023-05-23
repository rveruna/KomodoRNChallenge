import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
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
  const [isError, setIsError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem('locations');

      setLocations(storedLocations != null ? JSON.parse(storedLocations) : []);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const NavigationButton = () => (
    <TopNavigationAction icon={AddIcon} onPress={navigateDetails} />
  );


  const renderLocations = () => {
    if (locations.length === 0) {
      return <Text style={styles.noLocationsText}>No locations added</Text>;
    }

    return (
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#F0F0F0" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Something went wrong!</Text>
      </SafeAreaView>
    );
  }

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
