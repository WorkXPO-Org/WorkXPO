import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("supabase_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// if our token expired, we get rid of it
api.interceptors.response.use(
    (response) => response,
    (error) => {

        // if the backend returns 401, it means that the token is expire
        // so we'll remove this token
        if (error.response && error.response.status === 401) {
            console.warn("Sessão expirada. Limpando o token...");
            localStorage.removeItem("supabase_token");

            // we redirect the user to the home page
            if (window.location.pathname != "/projects") {
                window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);



export default api;