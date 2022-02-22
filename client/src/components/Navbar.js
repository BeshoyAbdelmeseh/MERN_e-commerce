import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/actions/auth.actions';

const NavBar = () => {

    const [willRedirect, setWillRedirect] = useState(false);
    const storeUsername = useSelector(state => state.UsersReducer.user.username);

    const dispatch = useDispatch();

    const showGuestComponents = () => {
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )
    }

    const showAuthedComponents = () => {
        return(
            <span className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hello, {storeUsername}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/addproduct">Add Product</Link></li>
                    <li><Link className="dropdown-item" to="/myproducts">My Products</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" onClick={UserLogout} href="#">Logout</a></li>
                </ul>
            </span>
        )
    }

    const LoadAuthComponents = () => {
        if (willRedirect) return <Redirect to="/logout"/>
        if(storeUsername)
            return showAuthedComponents();
        else
            return showGuestComponents();
    }

    const UserLogout = () => {
        localStorage.removeItem('token');
        dispatch(removeUser(""));
        setWillRedirect(true);
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{backgroundColor: "rgb(230,230,230)"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">E-commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Products</Link>
                        </li>
                    </ul>
                    {LoadAuthComponents()}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;