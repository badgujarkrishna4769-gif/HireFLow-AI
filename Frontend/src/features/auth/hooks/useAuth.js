import { use, useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {register, login, logout, getMe} from "../services/auth.api";
import { useLocation } from "react-router";

export const useAuth = ()=> {
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;
    
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({ username, email, password });

            if (data.status === 201 || data.user) {
                setUser(data.user);
            }
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({ email, password })=> {
        setLoading(true);
        try {
            const data = await login({ email, password });
            if (data.status === 201 || data.user) {
                setUser(data.user);
            }
            return data;
        }catch(err) {
            console.log(err);
            throw err;
        }finally {
            setLoading(false);
        }
    } 

    const handleLogout = async ()=> {
        setLoading(true);
        try {
            const data = await logout();
            setUser(null);
        }catch(err) {

        }finally {
            setLoading(false);
        }
    }

    const location = useLocation();

    useEffect(()=> {
        const getMeAndSetUser = async ()=> {
            try {
                const data = await getMe();
                if(data.user) {
                    setUser(data.user);
                }else {
                    setUser(null);
                }
            }catch(err) {
                setUser(null);
            }finally{
                setLoading(false);
            }
        }
        getMeAndSetUser();

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout };
}

