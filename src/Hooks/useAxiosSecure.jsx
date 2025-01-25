import axios from "axios";
import useAuth from './useAuth';
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: "https://y-nu-two.vercel.app"
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
  const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access-token")
        console.log('req stopped by interceptors', token);
        config.headers.authorization = `bearer ${token}`
        return config
    }, function (err) {
        return Promise.reject(err)
    })

    //  intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(res => {
        return res;
    }, async err => {
        const status = err.response.status
        console.log(err);
        if (status === 401 || status === 403) {
            await logOut();
            navigate("/login");
        }
        return Promise.reject(err);
    })
    return axiosSecure;
};

export default useAxiosSecure;