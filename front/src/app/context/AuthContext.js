import {createContext, useState, useContext} from 'react'

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({accessToken: null});
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>   
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
