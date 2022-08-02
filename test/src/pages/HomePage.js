import React, {useState, useEffect,useContext} from "react";
import {Route, Switch, withRouter,Link} from "react-router-dom";
import { Layout ,Breadcrumb,Drawer,Tooltip,Button,Row,Input,message } from 'antd';
import { HomeOutlined ,EditTwoTone} from '@ant-design/icons';
import {connect} from "react-redux";
import {login} from "../action/user";
import Menulayout from '../components/leftMenu/menu.js';
import tuichu from '../static/images/tuichu.png'
import LogoImag from '../static/images/logo192.png'
import '../css/homePage.styl'
import {_loginOut} from '../service/server'
import titleConfig from '../utils/titleConfig'

const { Header, Content, Footer} = Layout;

export default withRouter (connect(
    // mapStateToProps 把state映射到props上

    state => {
        return {
            isLogin: state.user.isLogin,
            loading: state.user.loading,
            err: state.user.err,
            userInfo: state.user.userInfo,
            menuTitle:state.menu.menuTitle
        };
    },
    // mapDispatchToProps
    {
        login
    }
)
(
 function PageContainer(props){
     console.log('process.env.NODE_ENV',process.env.NODE_ENV);
    const [menuTitle,setMenuTitle] = useState('');
    const [visible,setVisible] = useState(false);
    const [suggestValue,setSuggestValue] = useState(false);
    const [pathname] = useState(props.location.pathname);
    const [userName,setusername] = useState(localStorage.getItem('currentUm'));
    const [boxheight,setboxheight] = useState(document.body.clientHeight)

    function loginout(){
        _loginOut().then(res=>{
            if(res.status === 200 ){
                localStorage.clear();
                props.login({
                    type: "LOGIN_FAILURE",
                })
                //退出登录的跳转
                window.location.href = ``
            }
        })
    }
    const onClose = () => {
       setVisible(false)
    };

    const onChange = (e)=>{
      setSuggestValue(e.target.value)
    }
    useEffect(async ()=>{
        // try{
        //     const res = await _getauthInfo()
        //     if(res.status==200 && res.data.code === 1000){
        //         props.login({
        //             type: "LOGIN_SUCCESS",
        //             payload: {...res.data}
        //           })
        //         localStorage.setItem('currentUm',res.data.data.um);
        //         localStorage.setItem('authGroup',JSON.stringify(res.data.data.authGroup));
        //         setusername(res.data.data.um)
        //         props.history.push(props.history.location.pathname);
        //     } else {
        //         if(res.data.code ===400 || res.data.code === 1010){
        //             localStorage.clear()
        //             props.login({
        //                 type: "LOGIN_FAILURE",
        //             })
        //             //登录失败的的跳转
        //         window.location.href = ``
        //         }
               
               
        //     }
        // }
        // catch(res){
        //     localStorage.clear()
        //     props.login({
        //         type: "LOGIN_FAILURE",
        //     })
        //     if ( res.response.data.msg=="请求中未包含token" ) {
        //          //登录失败的的跳转
        //          window.location.href = ``
        //     }
        // }
      
    },[])
   function componentWillUnmount(){
    //    clearInterval(timer)
    //    clearTimeout(timer2)
   }
    useEffect(() => {
            console.log('props.location--useEffect',props);
            let obj = sessionStorage.getItem('setConfObj')?JSON.parse(sessionStorage.getItem('setConfObj')):{} 
            setMenuTitle(titleConfig[props.location.pathname]);
            // document.title = '流水线'
      });
    useEffect(()=>{ 
        let boxheight = (document.documentElement.clientHeight || document.body.clientHeight);
        setboxheight(boxheight)
        window.addEventListener('resize', handleResize);
        return ()=>{
            window.removeEventListener('resize', handleResize);
        }
    },[]);
    const handleResize = ()=>{
        let boxheight = (document.documentElement.clientHeight || document.body.clientHeight);
        setTimeout(()=>{
            setboxheight(boxheight)
        },100)
    } 
    return (
            <Layout style={{ height: '100%',overflow: 'hidden' ,overflowY:'scroll'}}>
                {/* <Button
                size="large"
                className="buttonHover"
                onClick={showDrawer} 
                    shape="circle" 
                    style=
                        {{position: 'absolute',
                        bottom: '10px',
                        right: '40px',
                        zIndex: 100
                        }}>
                    <EditTwoTone />
                </Button> */}
                <div className="topheader">
                    <div className="topheaderleft"><Link to="/flow"><img src={LogoImag}/><h2>　欢迎登录demo管理平台</h2></Link></div>
                    <div className="rightdiv">
                        <span>您好,{userName}　欢迎登录demo管理平台！</span>
                        {/* <span></span>
                        <span>{userName}</span> */}
                        <img src={tuichu} onClick={loginout}/>
                    </div>
                </div>
                <Layout>
                    <Menulayout pathname={props.location.pathname}/>
                    <Layout className="site-layout mainPasge">
                            <Content>
                                <div className="site-layout-background mainContent">
                                <Switch>
                                    {
                                          props.child&&props.child.map((childRoute)=>(
                                            <Route path={childRoute.path}  key={childRoute.path} meta={childRoute.meta}  exact={childRoute.exact}  component={childRoute.component} />
                                        ))
                                    }
                                        </Switch>
                                </div>
                            </Content>
                            {/* <Footer style={{ textAlign: 'center' }}>Copyright © 2021-2022 WX Co.,Ltd.</Footer> */}
                        </Layout>
                </Layout>
            </Layout>
        )
    }
))
