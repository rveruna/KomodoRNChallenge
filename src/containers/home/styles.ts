import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: 44,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  itemContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
  },
  itemLocation: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  itemContainerPressed: {
    backgroundColor: '#E0E0E0',
  },
  noLocationsText: {
    marginVertical: 50,
    alignSelf: 'center',
  },
});

export default styles;
