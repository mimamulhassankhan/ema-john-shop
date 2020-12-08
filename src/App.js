import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from './Component/Review/Review';
import Inventory from './Component/Inventory/Inventory';
import Error from './Component/Error/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Shipment from './Component/Shipment/Shipment';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Footer from './Component/Shared/Footer/Footer';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
