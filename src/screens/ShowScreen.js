import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    // This should be the big list of blog posts that we have 
    const {state} = useContext(Context);

    // Find is a built in helper function 
    // We pass in a function to it, the first time it returns true
    // We take the blogpost we find and assign it to that variable

    // is the blogpost id equal to navigation.getParam('id') ?
    const blogPost = state.find(
        (blogPost) => blogPost.id === navigation.getParam('id')
    );

    return (
        <View>
            <Text> {blogPost.title}</Text>
            <Text> {blogPost.content}</Text>
        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: (
            <TouchableOpacity 
                onPress={() => 
                    navigation.navigate('Edit', {id: navigation.getParam('id') })
                }
            >
                <FontAwesome name="pencil" size={30} style={Styles.pencil} />
            </TouchableOpacity>
        )
    };
};


const Styles = StyleSheet.create({
    pencil: {
        marginRight: 15
    }
});

export default ShowScreen;