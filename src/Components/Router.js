import React from 'react';
import {HashRouter as BrowserRouter, Route, Switch} from 'react-router-dom';
import History from '../pages/History';
import Faq from '../pages/Faq';
import Setting from '../pages/Setting';
import Dashboard from '../pages/Dashboard';
import OrderDetail from '../pages/OrderDetail';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import AddRestaurant from '../pages/admin/AddRestaurant';
import ShowRestaurant from '../pages/admin/ShowRestaurant';
import PageNotFound from './PageNotFound';

export default function Router() {

    return (
    			<BrowserRouter>
	               
                	<Switch>
                        <Route path="/restaurant/:id" component={Dashboard} />
                        <Route path="/orderHistory" component={History} />
                        <Route path="/orderDetail/:id" component={OrderDetail} />
                        <Route path="/settings" component={Setting} />
                        <Route path="/Faq" component={Faq} />
                        <Route path="/logout" component={Landing} />
                        <Route path="/Restaurants" component={ShowRestaurant} />
                        <Route path="/AddRestaurant" component={AddRestaurant} />
                        <Route path="/" exact component={Login} />
                        <Route component={PageNotFound} />
                        
                    </Switch>
                    
                </BrowserRouter>
    	);
}