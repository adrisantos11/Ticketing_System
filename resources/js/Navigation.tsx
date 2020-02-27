import * as React from 'react';
import { HashRouter, Switch, Route, Router } from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { MainPage } from './Pages/MainPage/MainPage'

export const Navigation: React.FunctionComponent = () => {
    return(
        <HashRouter>
            <Switch>
                <Route exact={true} path='/' component={ Login }></Route>
                <Route path='/mainPage' component={ MainPage }></Route>
            </Switch>
        </HashRouter>
    );
}