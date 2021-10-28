const URL = "https://3000-plum-squirrel-2vm5c1w1.ws-eu17.gitpod.io/";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogin: false
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
			registerTraveler: travelerData => {
				//const store = getStore();
				console.log(travelerData, "travelerData");

				let formData = new FormData();
				formData.append("username", travelerData.username);
				formData.append("email", travelerData.email);
				formData.append("password", travelerData.password);
				if (file != undefined) {
					formData.append("avatar", travelerData.file, travelerData.file.file.name);
				}

				fetch(URL + "user/register/traveler", {
					method: "POST",
					body: formData,
					redirect: "follow",
					headers: {
						//"Content-Type": "application/json"
					}
				})
					.then(res => {
						if (res.status == 200) {
							setTimeout(() => {
								props.history.push("/login");
							}, 1000);
						} else if (res.status == 404) {
							setNoValied({
								status: true,
								msg: "introduce todos los campos"
							});
						}
						if (res.status == 409) {
							setExist({ status: true, msg: "Correo o nombre de usuario ya existe " });
						}
					})
					.then(data => {
						setStore({ travelerInfoCollected: data });
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	};
};

export default getState;
