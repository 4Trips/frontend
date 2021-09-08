const URL = "https://3000-fuchsia-roundworm-01twreak.ws-eu16.gitpod.io/";
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
			registerPro: (pro, props, file, setValied, setExist, setNoValied) => {
				const store = getStore();
				const {
					user_name,
					email,
					password,
					phone,
					url,
					direction,
					location,
					vat_number,
					social_reason,
					avatar
				} = pro;
				console.log(pro, "pro en registrpro");
				let formData = new FormData();
				formData.append("user_name", user_name);
				formData.append("email", email);
				formData.append("password", password);
				formData.append("phone", phone);
				formData.append("url", url);
				formData.append("direction", direction);
				formData.append("location", location);
				formData.append("vat_number", vat_number);
				formData.append("social_reason", social_reason);
				if (file != undefined) {
					formData.append("avatar", file, file.name);
				}
				fetch(URL + "user/register/pro", {
					method: "POST",
					body: formData,
					headers: {
						//"Content-Type": "application/json"
					}
				})
					.then(res => {
						if (res.status == 201) {
							setValied({ status: true, msg: "Registro completado con éxito" });
							setTimeout(() => {
								props.history.push("/login");
							}, 1000);
						} else if (res.status == 404) {
							setNoValied({
								status: true,
								msg: "introduce todos los campos obligartorios "
							});
							res.json();
							return;
						} else if (res.status == 409) {
							setExist({
								status: true,
								msg: "Correo o nombre de usuario existe "
							});
						}
					})
					.then(data => {
						setStore({ proInfoCollected: data });
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	};
};

export default getState;
