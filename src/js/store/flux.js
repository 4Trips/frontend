const URL = "https://3000-plum-squirrel-2vm5c1w1.ws-eu23.gitpod.io/";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogin: false,
			errorsBackEnd: [],
			travelerInfoCollected: []
		},
		actions: {
			login: (body, setErrFetch, history, setLoading) => {
				const store = getStore();
				fetch(URL + "login", {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => {
						console.log(res);
						if (res.status == 401) {
							setErrFetch({
								status: true,
								msg: "Usuario o contraseña incorrectos"
							});
							setLoading(false);
							return;
						} else if (res.status == 404) {
							setErrFetch({
								status: true,
								msg: "Usuario no existe"
							});
							setLoading(false);
							return;
						} else if (res.status == 500) {
							setErrFetch({
								status: true,
								msg: "Error interno"
							});
							setLoading(false);
							return;
						}
						return res.json();
					})
					.then(data => {
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("rol", data.rol);
						localStorage.setItem("id", data.id);
						console.log(data, "data");
						setStore({ isLogin: true, rol: data.rol, tripList: [] });
						getActions().loadingTrips(1);
						setLoading(false);
						history.push("/");
					})
					.catch(err => {
						console.log(err, "error login ");
					});
			},
			registerTraveler: (traveler, props, values, file) => {
				const store = getStore();
				const { username, email, password, avatar } = traveler;
				let formData = new FormData();
				formData.append("username", username);
				formData.append("email", email);
				formData.append("password", password);
				formData.append("avatar", avatar);
				fetch(URL + "user/register/traveler", {
					method: "POST",
					body: formData,
					redirect: "follow"
					//	headers: { "Content-Type": "multipart/form-data" }
				})
					.then(data => {
						setStore({ travelerInfoCollected: data });
					})
					.catch(err => {
						console.log(err);
					});
			},
			registerTravelerAwait: async (traveler, values, file) => {
				const { username, email, password, avatar } = traveler;
				let formData = new FormData();
				formData.append("username", username);
				formData.append("email", email);
				formData.append("password", password);
				console.log(file.name);
				console.log(file, "file fetch");
				console.log(traveler, "traveler antes file");

				if (avatar != undefined) {
					formData.append("avatar", traveler.avatar, traveler.avatar.name);
				}
				console.log(traveler);
				const response = await fetch(URL + "user/register/traveler", {
					method: "POST",
					body: formData,
					redirect: "follow"
					//headers: { "Content-Type": "multipart/form-data" }
				});
				const data = setStore({ travelerInfoCollected: response.json() });
				if (response.status === 409) {
					setStore({ errorsBackEnd: response.json() });
				}
			}
		}
	};
};

export default getState;
