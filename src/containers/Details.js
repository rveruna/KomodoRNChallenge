import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import styles from './DetailsScreenStyles';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Details Screen"
        alignment="center"
        accessoryLeft={BackAction}
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
      </Layout>
    </SafeAreaView>
  );
};
