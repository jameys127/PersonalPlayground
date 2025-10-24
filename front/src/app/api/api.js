import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3500',
    withCredentials: true,
});

let accessToken = null;
let setAuthFn = null;

export const attachAuth = (token, setAuth) => {
    accessToken = token;
    setAuthFn = setAuth
}

api.interceptors.request.use(
    (config) => {
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const refreshRes = await api.get('/auth/refresh');
                const newToken = refreshRes.data.accessToken;
                accessToken = newToken;
                if (setAuthFn) setAuthFn({ accessToken: newToken });

                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshErr) {
                console.error('Token refresh failed:', refreshErr);
                if (setAuthFn) setAuthFn({ accessToken: null });
            }
        }
        return Promise.reject(error);
    }
)

export default api;