import { Route, Switch } from 'react-router-dom'
import { lazy } from 'react';
import Login from '../Pages/Login/Login';
import Dashbord from '../Pages/Dashboard/Dashboard';
import Profile from '../Pages/Profile/Profile';
import EditItem from '../Pages/EditItem/EditItem';

const Routes = () =>
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashbord} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/edit-item" component={EditItem} />
    </Switch>


export default Routes
