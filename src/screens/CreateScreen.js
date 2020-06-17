import React, { useContext } from 'react';
import { StyleSheet} from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

// Even though we're using Context to manage the app's state
// We still need local state inside of one component
// Here it's the text we input 
const CreateScreen = ({ navigation }) => {
    // We reuse the 'addBlogPost' function defined inside of BlogContext 
    const { addBlogPost } = useContext(Context);

    // Anytime someone submits the form, we want to call this onSubmit function 
    return (
        <BlogPostForm 
            onSubmit={(title, content) => {
                // Here we call addBlogPost and also navigate the user back to Index after submission 
                addBlogPost(title, content, () => navigation.navigate('Index'));
            }} 
        />
    );
};

const styles = StyleSheet.create({

});

export default CreateScreen;