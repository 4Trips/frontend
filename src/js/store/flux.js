const URL = "https://3000-plum-squirrel-2vm5c1w1.ws-eu23.gitpod.io/";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogin: false,
			travelerInfoCollected: [],
			errorBack: [],
			loading: false
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
			registerTravelerAwait: async (traveler, values, file, setLoading) => {
				setStore({ loading: true });
				const { username, email, password, avatar } = traveler;
				let formData = new FormData();
				formData.append("username", username);
				formData.append("email", email);
				formData.append("password", password);
				if (avatar != undefined) {
					formData.append("avatar", avatar);
				}
				console.log(traveler);
				const response = await fetch(URL + "user/register/traveler", {
					method: "POST",
					body: formData,
					redirect: "follow"
				});
				//const data = setStore({ travelerInfoCollected: response.json() });
				if (response.status === 409) {
					setStore({ errorBack: "Correo o nombre exite" });
				}
				if (response.status === 200) {
					setStore({ errorBack: "" });
				}
				setStore({ loading: false });
			},
			addTrip: async trip => {
				const token = localStorage.getItem("token");
				let newNeedsTrip = ""; //convierto el array needs_trip en string para que lo pueda recoger el backend
				for (let i = 0; i < trip.needs_trip.length; i++) {
					newNeedsTrip += trip.needs_trip[i] + ",";
				}
				trip.needs_trip = newNeedsTrip.slice(0, -1); //quito la última coma
				const response = await fetch(URL + "viaje", {
					method: "POST",
					body: JSON.stringify(trip),
					headers: {
						Authorization: "Bearer " + token, //tengo que hacer espacio despues de Bearer para que pueda funcionar el split
						"Content-Type": "application/json"
					}
				});
				if (response.status == 200) {
					setStore({ page: 1, tripList: [] });
					getActions().loadingTrips(1);
					return true;
				} else return false;
			}
		}
	};
};

export default getState;
