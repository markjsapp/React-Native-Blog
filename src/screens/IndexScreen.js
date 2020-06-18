import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation })=> {
    // Destructuring the object passed
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    // Remember that useEffect is used for running code only one time 
    // When the component is first rendered 
    // Initial fetch/load
    useEffect(() => {
        // Anytime we first navigate to this screen
        // We call this method 
        getBlogPosts();
        // Anytime this component (IndexScreen) has focus
        // Then this callback function is invoked
        const listener = navigation.addListener('didFocus', () =>{
            // Another page refresh/fetch 
            // What we've done here: if this default screen gains focus after the initial load
            // this function will fire off a function to refresh the page. 
            getBlogPosts();
        });

        // If down the line, we remove Index completely
        // We can add this function to prevent memory leaks
        return () => {
            // As soon as our component isn't visible, clean up 
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor = {blogPosts => blogPosts.title}
                renderItem = {({ item }) => {
                    return (
                        <TouchableOpacity onPress = {() => navigation.navigate('Show', {id: item.id})}>
                            <View style={styles.row}>
                                <Text style={styles.title}> 
                                    {item.title} - {item.id} 
                                </Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                />
        </View>
    );
};

// Header customization 
IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    plus: {
        paddingHorizontal: 50
    }
});

export default IndexScreen;