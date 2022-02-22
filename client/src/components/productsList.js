import React, {useEffect, useState} from "react";
import NavBar from "./Navbar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {setAllProducts} from '../redux/actions/products.actions'
import errImg from '../imgs/ErrorImg.png';
import { Link } from "react-router-dom";
import spinner from '../imgs/loading-spinner-final.svg';
import ServerName from '../server.config';

const ProductsList = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const allProducts = useSelector(state => state.ProductsReducer.allProducts);
    const dispatch = useDispatch();
    
    useEffect(() => {
        document.title = `Products`;
        axios.get(ServerName + 'products', {withCredentials: true})
        .then(respose => {
            if (respose.data.success === true)
                dispatch(setAllProducts(respose.data.products))
            else
                setHasError(true);
            setIsLoaded(true);
        })
        .catch(() => {
            setHasError(true);
            setIsLoaded(true);
        })
    }, [])

    const spawnItems = () => {
        if (allProducts.length <= 0){
            return(showError("No products found."))
        }
        else{
            return(
                allProducts.map((product) => {
                    return(
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
                            <div className="card bg-light rounded p-2">
                                <div className="text-center bg-white mx-auto" style={{width: "12rem", height: "12rem"}}>
                                    <img src={product.Photo} className="card-img-top img-thumbnail h-100 w-auto" alt="Item iamge"/>
                                </div>
                                <div className="card-body p-1">
                                    <h5 className="card-title text-truncate">{product.Name}</h5>
                                    <p className="card-text text-break text-truncate">{product.Description}</p>
                                    <h6 className="d-inline">${product.Price}</h6>
                                    <Link to={`/product/${product._id}`} className="float-end">More details</Link>
                                </div>
                            </div>
                        </div>
                    )
                })
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
                    <div className="container">
                        <div className="row">
                            {spawnItems()}
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

export default ProductsList;