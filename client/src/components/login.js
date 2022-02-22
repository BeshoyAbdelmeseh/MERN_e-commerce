import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/auth.actions";
import NavBar from './Navbar';
import spinner from '../imgs/loading-spinner-final.svg';
import ServerName from '../server.config';

const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [willRedirect, setWillRedirect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const dispatch = useDispatch();
    
    const showSpinner = () => {
        return(
            <img src={spinner} alt="spinner" className="position-absolute top-50 start-50 translate-middle"/>
        );
    };

    useEffect(() => {
        document.title = `Login`;
        const token = localStorage.getItem('token');
        axios.post(ServerName + "auth", {}, { 
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }})
        .then(response => {
            setWillRedirect(response.data.username ? true : false);
            setIsLoaded(true);
        })
        .catch(() => {
            setWillRedirect(true);
            setIsLoaded(true);
        })
    }, [])

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitLogin = (e) => {        
        e.preventDefault();
        if (username === "" || password === ""){
            setErrMsg("Enter valid username and password.");
            return;
        }
        axios.post(ServerName + "login",{
            username: username,
            password: password
        }, { withCredentials: true })
        .then(response => {
            if (response.data.success === true){
                localStorage.setItem('token', response.data.token);
                dispatch(setUser({
                    username: response.data.username,
                    }));
                setWillRedirect(true);
            }
            else
                setErrMsg(response.data.msg);
        })
        .catch((err) => {
            setErrMsg("An error occured, please try again later.");
        })
    }

    const renderComponent = () => {
        if (willRedirect) return <Redirect to="/"/>
        else{
            return(
                <div className="vh-100" style={{backgroundColor: "rgb(235,235,235)"}}>
                    <NavBar />
                    <div className="position-absolute top-50 start-50 translate-middle bg-light rounded col-10 col-sm-8 col-md-6 col-lg-4 px-5 py-2">
                        <form>
                            <h2 className="text-center mb-4">Login</h2>
                            <div className="mb-4">
                                <input type="text" 
                                    onChange={onChangeUsername}
                                    value={username}
                                    placeholder="Enter your username" 
                                    name="username" 
                                    required
                                    className="border border-secondary rounded form-control mb-3 w-100">
                                </input>
                                <input type="password" 
                                    value={password}
                                    onChange={onChangePassword}
                                    placeholder="Enter your password" 
                                    name="password" 
                                    required
                                    className="border border-secondary rounded form-control w-100">
                                </input>
                                <p className="text-danger">{errMsg}</p>
                            </div>                    
                            <div className="mb-3 text-center">
                                <input type="submit"
                                    onClick={onSubmitLogin}
                                    className="btn btn-primary px-3"
                                    value="Login">
                                </input>
                            </div>
                        </form>
                        <div className="mb-3 text-center">
                            <span>Don't have an account?</span><br/>
                            <a href="/register" style={{textDecoration: "none"}}>Create an account</a>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return(
        <div>
            {isLoaded ? renderComponent() : showSpinner()}
        </div>
    );
}

export default Login;