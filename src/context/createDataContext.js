import React, {useReducer} from 'react';

// We pass three things that need to be customized
// Anytime we create a context
// This is a reusable function that we can use multiple times in the application
// To automate the process of setting up context and the provider
export default (reducer, actions, initialState) => {
    // Creates a context object
    const Context = React.createContext();

    // Create a component that accepts children as an argument
    // 'children' is considered another component 
    const Provider = ({ children }) => {
        
        // Setter updates blogPosts
        // Default value is an empty array
        const [state, dispatch] = useReducer (reducer, initialState);

        // Loop through actions object
        // For every key (addBlogPost) 
        // We call it with the dispatch argument
        // That gives us back the return function 
        // That will let all the child components rerender with changes
        /// actions === { addBlogPost: (dispatch) => {return () => {}}}
        
        // Initialize an object
        const boundActions ={};
        for (key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        // Allows us to accept a different component as an argument (here it's children)
        // </Provider> makes the Redux store available to any nested components
        // The value prop is information we want to share: currently set to 5
        // You can't use an object for value, you'll hit an error
        return <Context.Provider value={{ state, ...boundActions }}>
            { children }
        </Context.Provider>
    }

    return {Context, Provider };
};