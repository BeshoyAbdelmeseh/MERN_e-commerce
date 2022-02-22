import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import NavBar from "./Navbar";
import spinner from '../imgs/loading-spinner-final.svg';
import ServerName from '../server.config';

const Register = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [willRedirect, setWillRedirect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const showSpinner = () => {
        return(
            <img src={spinner} alt="spinner" className="position-absolute top-50 start-50 translate-middle"/>
        );
    };

    useEffect(() => {
        document.title = `Register`;
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
    }, []);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmitLogin = (e) => {
        e.preventDefault();
        if (username === "" || password === ""){
            setErrMsg("Enter valid username and password.");
            return;
        }
        if (password !== confirmPassword){
            setErrMsg("Passwords doesn't match");
            return;
        }
        axios.post(ServerName + "register",{
            username: username,
            password: password
        }, { withCredentials: true })
        .then(response => {
            if (response.data.success === true){
                setWillRedirect(true);
            }
            else
                setErrMsg(response.data.msg);
        })
        .catch(() => {
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
                            <h2 className="text-center mb-4">Register</h2>
                            <div className="mb-4">
                                <input type="text" 
                                    onChange={onChangeUsername}
                                    value={username}
                                    placeholder="Choose a username" 
                                    name="username" 
                                    required
                                    className="border border-secondary rounded form-control mb-3 w-100">
                                </input>
                                <input type="password" 
                                    value={password}
                                    onChange={onChangePassword}
                                    placeholder="Type a password" 
                                    name="password" 
                                    required
                                    className="border border-secondary rounded form-control mb-3 w-100">
                                </input>
                                <input type="password" 
                                    value={confirmPassword}
                                    onChange={onChangeConfirmPassword}
                                    placeholder="Confirm password" 
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
                                    value="Register">
                                </input>
                            </div>
                        </form>
                        <div className="mb-3 text-center">
                            <span>Already have an account?</span><br/>
                            <a href="/login" style={{textDecoration: "none"}}>Login to your account</a>
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

export default Register;