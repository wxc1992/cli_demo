import React, {Component} from "react";
import {Redirect,withRouter} from "react-router-dom";
import { Form, Input, Button ,message,Row,Col} from 'antd';
import {connect} from "react-redux";
import {login} from "../action/user";
import '../css/login.styl'
import axios from '../plugins/axios'
import BgImag from '../static/images/login.png'
import LogoImag from '../static/images/logo.png'
import { TranslationOutlined } from "@ant-design/icons";
import Dotline from "../plugins/dotline.js";
import {getCaptcha} from '../service/server'

export default withRouter(connect(
  // mapStateToProps 把state映射到props上
  // ({user}) => ({user}),
  state => {
    return {
      isLogin: state.user.isLogin,
      loading: state.user.loading,
      err: state.user.err,
      userInfo: state.user.userInfo
    };
  },
  // mapDispatchToProps
  {
    login
  }
)(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = {username: "",verCode:''};
      this.dotline  = null;
    }
  
   getLine(){
     const option = {
      dom: 'J_dotLine',//画布id
      cw: 1000,//画布宽
      ch: 500,//画布高
      ds: 250,//点的个数
      r: 3,//圆点半径
      cl: '#3A6574',//粒子线颜色
      dis: 120//触发连线的距离
    }
   
   this.dotline = new Dotline(option);
   this.dotline.start()
   }
   
  async getCode(){
    const res = await getCaptcha()
     console.log('res.inmg',res)
     if(res.status === 200 && res.data.code===200){
       this.setState({
         verCode: res.data.data.image,
         verKey: res.data.data.key
       })
     }
  }
    componentDidMount(){
     this.getCode()
    //  this.getLine()
   }
  //  componentWillUnmount(){
  //    console.log('componentWillUnmount');
  //     this.dotline.close()
  //    this.dotline = null
  //  }

    render() {
      const {login,dispatch,isLogin,location} =  this.props;
      if (isLogin) {
        // 已经登录的话 从哪儿来的 回哪儿去；找不到从哪儿来，一般情况回去首页
        
        const {from = "/"} = (location && location.state) || {};
        return <Redirect to={{from}}/>;
      }
      const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 4,
          span: 16,
        },
      };
       const tailLayout2 = {
          labelCol: {
            span: 6,
          },
        wrapperCol: {
          span: 12,
        },
      };
     
      console.log('loginPagwe',this.props)
      
      const onFinish = async (values) => {
         let params = {
           ...values,
           verKey: this.state.verKey
         }
         const res = await axios.post('/api/admin/login',params);
         if(res.status === 200 && res.data.code ==404){
           message.error(res.data.message);
           login({
             type: "LOGIN_FAILURE",
           })
         } else if(res.status === 200 && res.data.code == 200 ){
           message.success('登陆成功');
              localStorage.setItem('token',res.data.data.token)
              localStorage.setItem('tokenHead',res.data.data.tokenHead)
              localStorage.setItem('userName',res.data.data.nickName)
              localStorage.setItem('deptName',res.data.data.deptName)
              login({
                type: "LOGIN_SUCCESS",
                payload: res.data.data
              })
              // this.props.history.push({
              //   pathname: '/',
              //   state:{
              //     token: localStorage.getItem('token')
              //   }
              // })
         } else {
           message.error(res.data.message);
           login({
            type: "LOGIN_FAILURE",
          })
         }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

       
      return (
        <div className="loginWarp" style={{backgroundImage: `url(${BgImag})`}}>
        <canvas id="J_dotLine"></canvas>
          <div className="LoginBox">
            <div className="titleNAme"><img src={LogoImag}/><h1>ACD管理平台</h1></div>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
             <Row>
              <Col span={24}>
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入您的用户名!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
             </Row>
              <Row>
              <Col span={24}>
                 <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入您账户的密码!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
             </Row>
              <Row>
                <Col span={16}>
                  <Form.Item
                     {...tailLayout2}
                    label="验证码"
                    name="verCode"
                    rules={[{ required: true, message: '请输入验证码!' }]}
                  >
                    <Input style={{height:'40px'}}/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <img onClick={this.getCode.bind(this)} src={this.state.verCode} style={{display:'inline-block',width: '110px',height:'40px',marginLeft:'-110px'}}/>
                </Col>
              </Row>
              <Form.Item {...tailLayout} >
                <Button type="primary" htmlType="submit">
                  登&nbsp;&nbsp;录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    }
  }
));
