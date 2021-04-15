import { Route, Switch } from 'react-router-dom'
import { lazy } from 'react';
import Login from '../Pages/Login/Login';
const Routes = () =>
    <Switch>
        <Route exact path="/login" component={Login} />
    </Switch>


export default Routes
