import React from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import routes from "../src/routes/index";
import 'antd/dist/antd.css';
import '../src/css/scroll.css';
import {ConfigProvider} from 'antd';
import cn from 'antd/es/locale/zh_CN';
export default function App(props) {
  // let token = localStorage.getItem('token');
  return (
    <ConfigProvider locale={cn}>
       <Router>
          <Switch>
              {
                routes.map(
                  route=>(
                  <Route 
                    path={route.path} 
                    key={route.path}
                    exact={route.exact}
                    render={
                      ()=>(
                        !route.auth?
                        (
                          <route.component child={route.children}  meta={route.meta}/>
                        )
                        :(
                          // localStorage.getItem('token')?
                          <route.component child={route.children} meta={route.meta}/>
                          // : <Redirect to='/login' />
                        )
                      )
                      }>
                    </Route>
                  )
                )
              }
          </Switch>
      </Router>
  </ConfigProvider>
  );
}

