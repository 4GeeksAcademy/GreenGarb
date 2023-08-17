import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			signup: async (email, username, password, name) => {
				try {
				  const response = await axios.post(process.env.BACKEND_URL + '/api/signup', {
					email,
					username,
					password,
					name,
				  });
				  if (response.status === 200) {
					
				  }
				} catch (error) {
					console.log(error)
				  // Handle errors and dispatch relevant actions if needed
				}
			  },
			
			login: async (username, password) => {
				try {
				  const response = await axios.post(process.env.BACKEND_URL + '/api/login', {
					username,
					password
				  });
		
				  if (response.status === 200) {
					// Login successful
					const access_token = response.data.access_token;
					return { access_token };
				  } else {
					// Login failed, return the error message
					const error = response.data.error;
					return { error };
				  }
				} catch (error) {
				  console.error('Error during login:', error);
				  return { error: 'An error occurred during login' };
				}
			  },
		
			logout: async () => {
				try {
				  const response = await axios.post(process.env.BACKEND_URL + '/api/logout');
				  if (response.status === 200) {
					return { success: true };
				  } else {
					const error = response.data.error;
					return { error };
				  }
				} catch (error) {
				  console.error('Error during logout:', error);
				  return { error: 'An error occurred during logout' };
				}
			  },

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		
		}
	};
};

export default getState;
