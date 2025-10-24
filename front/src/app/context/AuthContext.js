import {createContext, useState, useContext, useEffect} from 'react'
import api from '../api/api'

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({accessToken: null});

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try{
                const res = await api.get('/auth/refresh', {withCredentials: true});
                setAuth({accessToken: res.data.accessToken});
            }catch (err){
                console.log('No valid refresh token');
            }
        }
        verifyRefreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
