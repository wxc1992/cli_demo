// 注意这里我们除了从antd中引入了Layout布局组件，还引入了Menu菜单组件，Icon图标组件

import { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import { Layout, Menu ,message} from 'antd';
import {addMenuTitle} from '../../action/menu'
import 'font-awesome/css/font-awesome.css';
import 'react-fontawesome';
import menulist from '../../routes/menu.js'
// import {getTreeList} from '../../service/server.js';
import {connect} from "react-redux";


const { Sider } = Layout;
const { SubMenu } = Menu;

export default withRouter(
  connect(
    ({menu}) => ({menu}),
    {
      addMenuTitle
    }
  )(
    class Menulayout extends Component {
    constructor(props) {
      super(props);
      console.log('props---menu',props)
      this.state = {
        collapsed: false,
        menus: [],
        openKey: ['sub_sub1'],
        currentTitle: '',
        rootSubmenuKeys:[]
      }
    }
    
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };
    tabDash = (item, key, keyPath, domEvent )=>{
    }
    getmenu(){
      this.setState({menus: menulist})

      localStorage.setItem('roles', '管理员')
      localStorage.setItem('adminId', 222)
    }
    routerTo =(path,title)=>{
      this.props.history.push({pathname: path, state: {title:title}})
      
    } 
    componentDidMount() {
      this.getmenu();
      
    }
    // 当点击菜单时切换路由，如果当前组件是路由组件，可以直接调用 props 中的 history 对象，如果当前组件非路由组件，需要调用 withRouter 函数，传入当前组件，组件中就可以访问 history 对象了，当前示例 withRouter 函数的调用在代码最后
    handleChangeMenu = ({key}) => {
     console.log('key--menu',key)
      this.props.history.push(key);
    };

    // 设置了默认的 openKey 后，手动点击展开关闭菜单功能失效，需要绑定 openChange 函数，动态设置 openKey
    handleOpenChange = (keys) => {
      console.log('handleOpenChange',keys)
       const latestOpenKey = keys.find(key => this.state.openKey.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
         this.setState({openKey: keys})
        } else {
            if(latestOpenKey){
                this.setState({openKey: [latestOpenKey]})
            } else {
              this.setState({openKey: []})
            }
       }
    };

    // 利用 createMenuListMap 的递归调用实现菜单的动态创建，当 menuList 值改变时，菜单也会动态改变，可以将此方法声明成单独的组件，传值 list，并返回 JSX 节点列表
    createMenuListMap = (list) => {
      return list.map((item) => {
        if(item.children && item.children.length>0) {
          // 如果当前循环到的菜单项有 children，那就返回 SubMenu，否则返回的直接是 Menu.Item
          const path = this.props.location.pathname;
          const res = item.children.find(child => path.indexOf(child.name) >= 0);
          // if(res) this.openKey = item.name;
        
          return (
            <SubMenu
              key={`sub_${item.id}`}
              icon={<i className={`myfont ${item.icon} ant-menu-item-icon`} style={{marginRight: '10px'}}></i>}
              title={item.title}
            >
              {
                // 根据当前菜单的 children 去生成其子菜单，由于菜单项 menuList 是个有终结的数据，且嵌套层数并不复杂，所以这里不用担心递归会造成栈溢出的问题
                this.createMenuListMap(item.children)
              }
            </SubMenu>
          );
        } else {
         
          return (
            <Menu.Item 
              key={item.name} 
              icon={<i className={`myfont ${item.icon}`} style={{marginRight: '10px'}}></i>} 
            >
              <Link
              to={{ 
                pathname: item.name,
                state:{title: item.title}
               }}>
                {/* <item.icon /> */}
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        }
      });
    };

    render() {
      const { collapsed } = this.state;
      let name = this.props.pathname;
      let currentSelect =""
      if(name.indexOf('/instancemanagement/instancelist')>=0){
        currentSelect ="/instancemanagement/instancelist"
        document.title = "实例列表"
      }
      if(name.indexOf('/sql/sqlcheck')>=0){
        currentSelect ="/sql/sqlcheck"
        document.title = "SQL上线"
      }
      if(name.indexOf('/history/checkhistory')>=0){
        currentSelect ="/history/checkhistory"
        document.title = "审核记录"
      }
      if(name.indexOf('/history/carryouthistory')>=0){
        currentSelect ="/history/carryouthistory"
        document.title = "执行记录"
      }
      // let obj = sessionStorage.getItem('setConfObj')?JSON.parse(sessionStorage.getItem('setConfObj')):{} 
    
      return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <Menu 
                theme="light" 
                defaultSelectedKeys={['/flow']}
                // onClick={this.handleChangeMenu}
                selectedKeys={[currentSelect]}
                onOpenChange={this.handleOpenChange}
                openKeys={this.state.openKey}
                mode="inline"
              >
              {
                // 获取并渲染动态的菜单内容
                this.createMenuListMap(this.state.menus)
              }
              </Menu>
            </Sider>
      );
    }
  }
)
)