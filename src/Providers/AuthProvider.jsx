import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from './../Hooks/useAxios';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const googleLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const updateUsersProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userEmail = { email: currentUser.email }
                axiosPublic.post('/jwt', userEmail)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token);
                            setLoading(false)
                        }
                    })
            }

            else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }

        })

        return () => {
            return unsubscribe();
        }
    }, []);

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };


    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        googleLogin,
        loginUser,
        updateUsersProfile,
        logOut,
        setLoading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );

};

AuthProvider.propTypes = {
    children: PropTypes.object.isRequired,
}

export default AuthProvider;