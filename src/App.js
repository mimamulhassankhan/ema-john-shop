import React, { useEffect } from 'react';
import './App.css';
import Header from './Component/Header/Header';
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
import { addAllProduct, addCategory, fetchAllOrders, fetchSellerInfo } from './Redux/Actions/StoreActions';
import { connect } from 'react-redux';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const MainLayout = props => (
  <>
    <Header></Header>
    {props.children}
    <Footer></Footer>
  </>
)

const DashBoardLayout = props => (
  <>
    {props.children}
  </>
)


function App({addAllProduct, fetchAllOrders, fetchSellerInfo, addCategory}) {
  
  useEffect( () => {
    const fetchProductData = () =>{
      fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(productData => {
        addAllProduct(productData);
      });
    }

    const fetchOrderData = () => {
      fetch('http://localhost:5000/getAllOrders')
      .then(res => res.json())
      .then(orderData => {
        fetchAllOrders(orderData);
      });
    }

    const fetchSellerData = () => {
      fetch('http://localhost:5000/getAllSellers')
      .then(res => res.json())
      .then(sellerData => {
        fetchSellerInfo(sellerData);
      });
    }

    const fetchCategoryData = () => {
      fetch('http://localhost:5000/categories')
      .then(res => res.json())
      .then(categoryData => {
          addCategory(categoryData);
      })
    }
    
    fetchProductData();
    fetchOrderData();
    fetchSellerData();
    fetchCategoryData();
  }, [addAllProduct, fetchAllOrders, fetchSellerInfo, addCategory])


  return (
      <Router>
          <Switch>
            <AppRoute exact path="/" layout={ MainLayout } component={ HomePageIndex } />
            {/* <Route exact path="/">
              <HomePageIndex></HomePageIndex>
            </Route> */}
            <AppRoute exact path="/review" layout={ MainLayout } component={ Review } />
            {/* <Route path="/review">
              <Review></Review>
            </Route> */}
            <PrivateRoute path="/manage">
              <InventoryIndex></InventoryIndex>
            </PrivateRoute>
            <PrivateRoute path="/shipment">
              <>
              <Header></Header>
              <Shipment></Shipment>
              <Footer></Footer>
              </>
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
            <AppRoute path="/login" layout={ DashBoardLayout } component={ ProfilingPage } />
            {/* <Route path="/login">
              <ProfilingPage></ProfilingPage>
            </Route> */}
            <AppRoute path="/product/:productkey" layout={ MainLayout } component={ ProductDetails } />
            <Route path="/product/:productkey">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
      </Router>
  );
}

const mapStateToProps = state => {
  return{
    products: state.products
  }
}

const mapDispatchToProps = {
  addAllProduct : addAllProduct,
  fetchAllOrders: fetchAllOrders,
  fetchSellerInfo: fetchSellerInfo,
  addCategory: addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
