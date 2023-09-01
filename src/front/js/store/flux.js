import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: [
				{
					"address": null,
					"email":  null,
					"id": null,
					"name": null,
					"seller": [],
					"username": null,
					"pictures":null,
					
					
				}
			],
			name: null,
			address:null,
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
					const response = await axios.post(process.env.BACKEND_URL + 'api/signup', {
						email,
						username,
						password,
						name
					}, {
						headers: {
							'Content-Type': 'application/json',
						},
					});
					if (response.status === 200) {
						const data = response.data;
						
						sessionStorage.setItem('token', data.access_token)
						sessionStorage.setItem('user', data.username)
						sessionStorage.setItem('idUser', data.id)
						sessionStorage.setItem('name', data.name)
						setStore({ token: data.access_token, user: data.username, idUser: data.id, name:data.name });
						
					}
				} catch (error) {
					console.log(error);
					// Handle errors and dispatch relevant actions if needed
				}
			},

			login: async (username, password) => {
				try {
					const response = await axios.post(process.env.BACKEND_URL + '/api/login',
						{ username, password },
						{
							headers: {
								'Content-Type': 'application/json'
							  }
						})

					if (response.status === 200) {
						// Login successful
						const data = response.data;
						console.log(data)
						sessionStorage.setItem('token', data.access_token)
						sessionStorage.setItem('user', data.username)
						sessionStorage.setItem('idUser', data.id)
						setStore({ token: data.access_token, user: data.username, idUser: data.id });
						return true; // Return a success indicator
					} else {
						// Login failed, return the error message
						console.log('Login failed:', response.statusText);
						return { error: 'Login failed' };
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
			fetchUserData: async () => {
				try {
				  const response = await axios.get(process.env.BACKEND_URL + '/user/<int:user_id>', {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`
					}
				  });
		  
				  if (response.status === 200) {
					const userData = response.data;
					setStore({ user: userData }); 
				  }
				} catch (error) {
				  console.error('Error fetching user data:', error);
				}
			  },
			

			updateUserProfile: async (formData) => {
				try {
				  const response = await axios.post(process.env.BACKEND_URL + 'api/users/profile', formData, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
						
						'Content-Type': 'multipart/form-data'
					},
				  });
				  if (response.status === 200) {
					const data = response.data;
					console.log(data.message);
					// Update the user's profile data in the store if needed
				  }
				} catch (error) {
				  console.error('Error updating profile:', error);
				}
			  },
			  createSeller: async (formData) => {
				try {
				  const response = await axios.post(
					process.env.BACKEND_URL + 'api/sellers',
					formData,
					{
					  headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
						'Content-Type': 'multipart/form-data',
					  },
					}
				  );
			
				  if (response.status === 201) {
					const data = response.data;
					console.log(data.message);
					// Handle success if needed
				  }
				} catch (error) {
				  console.error('Error creating seller:', error);
				}
			  },
			  
			createProduct: async formData => {
				try {
					const response = await axios.post(
						process.env.BACKEND_URL + 'api/products',
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
								Authorization: `Bearer ${sessionStorage.getItem('token')}`
							}
						}
					);
					if (response.status === 200) {
						const data = response.data;
						console.log(data.message);
					}
				} catch (error) {
					console.error('Error creating product:', error);
					return error.response;
				}
			},
			



			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

		}
	};
};

export default getState;
