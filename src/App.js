import React from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from './Component/Review/Review';
import Inventory from './Component/Inventory/Inventory';
import Error from './Component/Error/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './Component/ProductDetails/ProductDetails';

function App() {
  return (
    <div>
      <Router>
        <Header/>
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
          <Route path="/manage">
            <Inventory></Inventory>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
