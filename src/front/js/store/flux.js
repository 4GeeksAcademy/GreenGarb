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
			],
			products: [
				{
					'title': 'shirt',
					'price': '$25',
					'image': 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600',
					'description': 'Handmade shirt made from recycled polyester and eco friendly ink.',
					'category': 'mens',
					'sub_category': 'tops',
					'condition': 'New',
					'material': 'Recycled materials',
					'id':'1'
				},
				{
					'title': 'NYC shirt',
					'price': '$28',
					'image': 'https://images.pexels.com/photos/1917611/pexels-photo-1917611.jpeg?auto=compress&cs=tinysrgb&w=600',
					'description': 'Nice comfy from NYC from the early 2000s. Only worn once. Made of 100% organic cotton.',
					'category': 'womens',
					'sub_category': 'tops',
					'condition': 'New',
					'material': 'Organic Fibers',
					'id':'2'
				},
				{
					'title': 'Jeans',
					'price': '$75',
					'image': 'https://images.pexels.com/photos/3324444/pexels-photo-3324444.jpeg?auto=compress&cs=tinysrgb&w=600',
					'description':'Made of recycled demin, these stylish jeans will make you look good and feel good',
					'category': 'womens',
					'sub_category': 'bottoms',
					'condition': 'New',
					'material': 'Recycled Fibers',
					'id':'3'
				},
				{
					'title': 'shoes',
					'price': '$35',
					'image': 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
					'description': 'Comfortable shoes made of Hemp and recycled materials size womens 7.',
					'category': 'shoes',
					'sub_category': '',
					'condition': 'New',
					'material': 'Hemp, Recycled Fibers',
					'id':'4'
				},
			]

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			addFavorite: () => {
				console.log('storeItem')
			},

			removeFavorite: () => {
				console.log('removeMe')
			},

			//saves token for everytime u load any page so its not lost
			setToken: () => {
				let token = sessionStorage.getItem('token');
				setStore({token:token})
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
				  const response = await axios.get(process.env.BACKEND_URL + '/user', {
					headers: {
					  Authorization: `Bearer ${getStore().token}`
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
				  const response = await axios.put(process.env.BACKEND_URL + '/api/users/profile', formData, {
					headers: {
					  'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
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
