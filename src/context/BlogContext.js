import React, { useReducer, useCallback } from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

// Reducer function 
const blogReducer = (state, action) => {
    // Depending on what type action has, we'll do a certain operation
    switch (action.type) {
        case 'get_blogposts':
            // This returns the array from the API 
            return action.payload;
        case 'edit_blogpost':
            // Map through all of the blog posts 
            return state.map(blogPost => {
                // Finding the correct blog post to edit 
                // Return the edited blog post
                // Else, return the existing blog post
                if (blogPost.id === action.payload.id) {
                    // Return the edited blog post
                    return action.payload;
                } else {
                    // Else, return the existing blog post 
                    return blogPost;
                };
            });
        case 'delete_blogpost':
            // iterates through all elements of the state array
            // then runs a child function 
            // if the ID is not equal to the blogpost the user specifies
            // keep it 
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [
                ...state, 
                // We want to generate a random number for the blog post ID
                // Remember that math.floor helps with rounding down
                {
                 id: Math.floor(Math.random() * 99999),
                 title: action.payload.title,
                 content: action.payload.content
                }
                ];
        default:
            return state;
        }
};

// Actions

const getBlogPosts = dispatch => {
    return async () => {
        // any address we put inside of this get
        // will be concatenated with the base URL 
        const response = await jsonServer.get('blogposts');
        // response.data === [{}, {}, {}]

        // after getting the response...
        // remember that dispatch takes the object, 
        //      automatically calls the reducer, and makes the object 
        //      the second argument for the reducer. 
        dispatch ({type: 'get_blogposts', payload: response.data });
    };
};

// This needs to access to the dispatch function to change our state
// Creates a blog post 
const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        // Anytime we want to make a record on our backend server
        // Second argument is the data we want to add to the server
        // We put this data inside of an object {} 
        await jsonServer.post('/blogposts', {title, content});

            // dispatch is defined inside of createDataContext
            //dispatch({ type: 'add_blogpost', payload: {title, content}});
            if (callback) {
                callback();
            }
    };
};

// Deletes a blog post
const deleteBlogPost = dispatch => {
    return async (id) => {
        // String catenation
        await jsonServer.delete(`/blog/posts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id})
    };
};

// Edits a blog post 
const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content });
        
        dispatch({ 
            type: 'edit_blogpost', 
            payload: { id, title, content}
        }); 
        // If we were in a scenario where we wanted to use this action
        // on some other unexpected screen, we could run into a callback error
        // this is to prevent that 
        if (callback) {
            callback()
        }
    };
};

// Destructure off whatever creataDataContext returns 
// Remember that destructuring is where we unpack values from arrays, object properties, etc 
export const {Context, Provider} = createDataContext(
    blogReducer, 
    // Remember that {} always means an object 
    // This is an object with different actions 
    {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
    // Default state, no blog posts 
    []
    );