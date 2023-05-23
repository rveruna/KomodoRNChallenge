import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
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
import styles from './styles';
import {openLocation} from '../../util/openLocation';
import {NavigationProp} from '@react-navigation/native';

interface Location {
  name: string;
  description: string;
  location: string;
}

interface Props {
  navigation: NavigationProp<any>;
}

const AddIcon = (props: any) => <Icon {...props} name="plus-outline" />;

export const HomeScreen: React.FC<Props> = ({navigation}: Props) => {
  const [isError, setIsError] = useState<boolean | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pressedItemIndex, setPressedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadLocations();
    });

    return unsubscribe;
  }, [navigation]);

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
    <TopNavigationAction
      accessibilityLabel="Add new location"
      accessibilityHint="Opens details screen"
      icon={AddIcon}
      onPress={navigateDetails}
      style={styles.addButton}
    />
  );

  const handleItemPress = (index: number, location: string) => {
    setPressedItemIndex(index);
    openLocation(location);
  };

  const renderItem = ({item, index}: {item: Location; index: number}) => {
    const isItemPressed = pressedItemIndex === index;

    return (
      <TouchableOpacity
        onPress={() => handleItemPress(index, item.location)}
        activeOpacity={0.8}>
        <Layout
          style={[
            styles.itemContainer,
            isItemPressed && styles.itemContainerPressed,
          ]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>
            Description: {item.description}
          </Text>
          <Text style={styles.itemLocation}>Location: {item.location}</Text>
        </Layout>
      </TouchableOpacity>
    );
  };

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
