import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import NavBar from "./Navbar";
import spinner from '../imgs/loading-spinner-final.svg';
import ServerName from '../server.config';

const AddProducts =  () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [willRedirect, setWillRedirect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const showSpinner = () => {
        return(
            <img src={spinner} alt="spinner" className="position-absolute top-50 start-50 translate-middle"/>
        );
    };

    useEffect(() => {
        document.title = `Add Product`;
        const token = localStorage.getItem('token');
        axios.post(ServerName + "auth", {}, { 
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }})
        .then(response => {
            setWillRedirect(response.data.username ? false : true);
            setIsLoaded(true);
        })
        .catch(() => {
            setWillRedirect(true);
            setIsLoaded(true);
        })
    }, [])

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangePhoto = (e) => {
        setPhoto(e.target.files[0]);
    }
    
    const onSubmitAdd = (e) => {
        e.preventDefault(); 
        if (name === "" || price === "" || isNaN(price) || photo === null || description === ""){
            setErrMsg("Enter valid data.");
            return;
        }
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        axios.post(ServerName + "products/add",
            formData
            , { withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }})
        .then(response => {
            if (response.data.success === true){
                setWillRedirect(true);
            }
            else{
                setErrMsg(response.data.msg);
            }
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
                        <form onSubmit={onSubmitAdd}>
                            <h2 className="text-center mb-4">Add Product</h2>
                            <div className="mb-4">
                                <input type="text" 
                                    onChange={onChangeName}
                                    value={name}
                                    placeholder="Product name" 
                                    required
                                    className="border border-secondary rounded form-control mb-3 w-100">
                                </input>
                                <input type="number" 
                                    value={price}
                                    onChange={onChangePrice}
                                    placeholder="Product price" 
                                    required
                                    className="border border-secondary rounded form-control mb-3 w-100">
                                </input>
                                <textarea value={description}
                                    onChange={onChangeDescription}
                                    placeholder="Description" 
                                    required
                                    rows={4}
                                    className="border border-secondary rounded form-control mb-3 w-100">
                                </textarea>
                                <input type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={onChangePhoto}                                
                                />
                                <p className="text-danger">{errMsg}</p>
                            </div>                    
                            <div className="mb-3 text-center">
                                <input type="submit"
                                    className="btn btn-primary px-3"
                                    value="Add product">
                                </input>
                            </div>
                        </form>
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

export default AddProducts;