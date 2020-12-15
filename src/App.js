import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from './Component/Review/Review';
import Error from './Component/Error/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Shipment from './Component/Shipment/Shipment';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Footer from './Component/Shared/Footer/Footer';
import ProfilingPage from './Component/Shared/ProfilingPage/ProfilingPage';
import InventoryIndex from './Component/Inventory/InventoryIndex/InventoryIndex';
import SuperAdminIndex from './Component/SuperAdminPage/SuperAdminIndex/SuperAdminIndex';
import SellerPortalIndex from './Component/SellerPortal/SellerPortalIndex/SellerPortalIndex';
import ConsumerPortalIndex from './Component/ConsumerPortal/ConsumerPortalIndex/ConsumerPortalIndex';
import HomePageIndex from './Component/HomePage/HomePageIndex/HomePageIndex';
import { addAllProduct } from './Redux/Actions/StoreActions';
import { connect } from 'react-redux';

export const UserContext = createContext();

function App({addAllProduct}) {
  
  useEffect( () => {
      fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => addAllProduct(data));
  }, [addAllProduct])


  return (
      <Router>
        <Header></Header>
          <Switch>
            <Route exact path="/">
              <HomePageIndex></HomePageIndex>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <PrivateRoute path="/manage">
              <InventoryIndex></InventoryIndex>
            </PrivateRoute>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <PrivateRoute path="/superAdmin">
              <SuperAdminIndex></SuperAdminIndex>
            </PrivateRoute>
            <PrivateRoute path="/sellerPortal">
              <SellerPortalIndex></SellerPortalIndex>
            </PrivateRoute>
            <PrivateRoute path="/myAccount">
              <ConsumerPortalIndex></ConsumerPortalIndex>
            </PrivateRoute>
            <Route path="/login">
              <ProfilingPage></ProfilingPage>
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
  );
}

const mapStateToProps = state => {
  return{
    products: state.products
  }
}

const mapDispatchToProps = {
  addAllProduct : addAllProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
