import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Icon,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import styles from './HomeScreenStyles';

const AddIcon = props => <Icon {...props} name="plus-outline" />;

export const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const NavigationButton = () => (
    <TopNavigationAction icon={AddIcon} onPress={navigateDetails} />
  );

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
      </Layout>
    </SafeAreaView>
  );
};
