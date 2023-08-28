import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
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
					const data = response.data;
					console.log(data)
					sessionStorage.setItem('token', data.access_token)
					sessionStorage.setItem('user', data.username )
					sessionStorage.setItem('idUser', data.id )
					setStore({ token: data.access_token, user: data.username, idUser: data.id });
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
		
			logout: () => {
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('user');
				sessionStorage.removeItem('idUser');
				setStore({
					token: null,
					user: null,
					idUser: null
				});
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
