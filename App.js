import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen
  }, 
  {
  initialRouteName:'Index',
  defaultNavigationOptions: {
    title: 'Blogs'
  }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Instead of directly exporting the app we wrapped it
// inside of a custom component 
const App = createAppContainer(navigator);

// We wrap the App in BlogProvider
// This allows us to pass data to nested components within the App
export default() => {
  return <Provider>
        <App />
    </Provider>
}