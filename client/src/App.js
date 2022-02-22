import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import productsList from './components/productsList';
import Login from './components/login';
import Register from './components/register';
import myProducts from './components/myProducts';
import AddProduct from './components/addProduct';
import CheckFirstAuth from './components/checkFirstAuth';
import OneProduct from './components/oneProduct';


function App() {
  return(
    <BrowserRouter>
      {CheckFirstAuth()}
      <Switch>
          <Route path="/" exact component={productsList}/>
          <Route path="/product/:id" exact component={OneProduct}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/addproduct" component={AddProduct}/>
          <Route path="/myproducts" component={myProducts}/>
          <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
