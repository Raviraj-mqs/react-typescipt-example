import React from 'react';
import './App.css';
import {  Switch } from 'react-router'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Components/HomePage';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import ProductsList from './Containers/Products/ProductsList';
import ViewProduct from './Containers/Products/ViewProduct';
import PageNotFound from './Components/PageNotFound';
import CartItems from './Containers/CartItems';

function App() {
    return (
        <div>
            Typescript with ReactJS
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/about" exact component={AboutUs} />
                        <Route path="/contact" exact component={ContactUs} />
                        <Route path="/products" exact component={ProductsList} />
                        <Route path="/products/:id" exact component={ViewProduct} />
                        <Route path="/cart" exact component={CartItems} />
                        <Route component={PageNotFound} />
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
