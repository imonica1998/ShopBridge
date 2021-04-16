import { Route, Switch } from 'react-router-dom'
import { lazy } from 'react';
import Login from '../Pages/Login/Login';
import Dashbord from '../Pages/Dashboard/Dashboard';
const Routes = () =>
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashbord} />
    </Switch>


export default Routes
