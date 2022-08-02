
import React from "react";
import {Route, Redirect} from "react-router-dom";
export * from './config';
const routes = [
    {
        path:'/',
        exact: true,
        component:()=>(<Redirect to="/instancemanagement/instancelist" />)
    },
    {
        path:'/',
        component: global.HomePage,
        auth: true,
        children:[
            {
                path:'/instancemanagement',
                // exact: true,
                name:'实例管理',
                component: global.Instancemanagement,
                meta:{
                    title:'实例管理',
                    key: "instancemanagement"
                }
            },
            {
                path:'',
                component:global.notFound
            },
            
        ]
    },
    {
        path:'',
        component:global.notFound
    }
];
export default routes;
