import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setFirstAuth } from "../redux/actions/auth.actions";
import ServerName from '../server.config';


const CheckFirstAuth = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const alreadyChecked = useSelector(state => state.UsersReducer.firstAuthChecked)
    useEffect(() => {
        if (!alreadyChecked){
            axios.post(ServerName + "auth", {}, { 
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            dispatch(setFirstAuth({firstAuth: true}));
            dispatch(setUser({
                username: response.data.username
            }));
        })
        .catch(() => {})
        }
    }, [])
}

export default CheckFirstAuth;