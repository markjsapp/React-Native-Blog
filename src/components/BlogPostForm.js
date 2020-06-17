import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, TextInput } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {
    // Local state
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label}> Enter Title: </Text>
                <TextInput 
                    style={styles.input} 
                    value={title} 
                    onChangeText={(text) => setTitle(text)} 
                />
            <Text style={styles.label}> Enter Content: </Text>
                <TextInput 
                    style={styles.input} 
                    value={content} 
                    onChangeText={(text) => setContent(text)} 
                />
            <Button 
            // If we were saving this data to an outside API, this would be the optimal setup
                title="Save Blog Post" 
                // Calling the function and setting the title and content
                onPress = {() => onSubmit(title, content)}
                />
        </View>
    );
};

// This fills in default values if they aren't passed
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
})

export default BlogPostForm; 