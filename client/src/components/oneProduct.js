import React, {useEffect, useState} from "react";
import NavBar from "./Navbar";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {setSelectedProduct} from '../redux/actions/products.actions'
import errImg from '../imgs/ErrorImg.png';
import spinner from '../imgs/loading-spinner-final.svg';
import ServerName from '../server.config';

const OneProduct = (props) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [willRedirect, setWillRedirect] = useState(false);
    const selectedProduct = useSelector(state => state.ProductsReducer.selectedProduct);
    const dispatch = useDispatch();
    
    useEffect(() => {
        document.title = `${props.match.params.id.charAt(0).toUpperCase() + props.match.params.id.slice(1)}`;
        const token = localStorage.getItem('token');
        axios.get(ServerName + 'products/' + props.match.params.id, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }})
        .then(respose => {
            if (respose.data.success === true)
                dispatch(setSelectedProduct(respose.data.product))
            else
                setHasError(true);
            setIsLoaded(true);
        })
        .catch(() => {
            setHasError(true);
            setIsLoaded(true);
        })
    }, [])

    const deleteItem = () => {
        const token = localStorage.getItem('token');
        axios.delete(ServerName + 'products/delete/' + selectedProduct._id, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }})
        .then(respose => {
            if (respose.data.success === true)
                setWillRedirect(true);
        })
        .catch(err => {})
    }

    const SpawnItems = () => {
        if (willRedirect) return <Redirect to="/"/>;
        if (selectedProduct.length <= 0){
            return(showError("Product not found."))
        }
        else{
            return(
                <div className="position-absolute top-50 start-50 translate-middle bg-light rounded col-11">
                    <div className="bg-light rounded m-2 d-md-flex">
                        <div className="text-center bg-white col-6 border my-2 mx-auto me-md-4" style={{width: "20rem", height: "20rem"}}>
                            <img src={selectedProduct.Photo} className="h-100 w-auto p-1" alt="Item iamge"/>
                        </div>
                        <div className="col my-auto">
                            <h5 className="col">{selectedProduct.Name}</h5>
                            <p className="col my-4">{selectedProduct.Description}</p>
                            <h6 className="d-inline ">Price: ${selectedProduct.Price}</h6>
                            {selectedProduct.Owned ? <a href="#1" onClick={deleteItem} className="float-end btn btn-danger">Delete</a> : null}
                        </div>
                    </div>
                </div>
            )
        }
    }

    const showError = (err) => {
        return(
            <div className="position-absolute top-50 start-50 translate-middle text-center">
                <img src={errImg} alt="error"/>
                <h3 className="text-danger text-center">{err}</h3>
            </div>
        )
    }

    const showSpinner = () => {
        return(
            <img src={spinner} alt="spinner" className="position-absolute top-50 start-50 translate-middle"/>
        );
    };

    const renderComponent = () => {
        if (hasError){
            return(
                <div style={{backgroundColor: "rgb(235,235,235)"}}>
                    {showError("An error occured please try again later.")}
                </div>
            );
        }
        else{
            return(
                <div style={{backgroundColor: "rgb(235,235,235)"}}>
                    <NavBar />
                    <div className="vh-100">
                        <div className="row">
                            {SpawnItems()}
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

export default OneProduct;