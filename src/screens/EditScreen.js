import React, {  useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import { HeaderTitle } from 'react-navigation-stack';

// Recieve the navigation prop 
const EditScreen = ({ navigation }) => {

    const id = navigation.getParam('id');

    const { state, editBlogPost } = useContext(Context);

    // loop through to find the blog post we want to edit 
    const blogPost = state.find((blogPost) => blogPost.id === id
    );

    return (
        <BlogPostForm 
            // Original values from the creation screen 
            initialValues = {{ title: blogPost.title, content: blogPost.content }}
            onSubmit={(title, content) => {
                // The action function that allows us to edit 
                editBlogPost(id,title,content, () => navigation.pop());
            }}
        />
    );
};

const styles = StyleSheet.create({})

export default EditScreen;