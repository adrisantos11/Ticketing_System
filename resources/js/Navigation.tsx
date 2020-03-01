import * as React from 'react';
import { BrowserRouter, Switch, Route, Router,  HashRouter } from 'react-router-dom'
import Login  from '../js/Pages/Login/Login'
import MainPage from '../js/Pages/MainPage/MainPage'
import * as ReactDOM from 'react-dom';

export const Navigation: React.FunctionComponent = () => {
    return(
        <HashRouter>
            <Switch>
                <Route exact={true} path='/'><Login /></Route>
                <Route path='/home'><MainPage /></Route>
            </Switch>
        </HashRouter>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(
    <Navigation />,
    document.getElementById('root'));
}
