import { Layout, Menu, Icon } from 'antd'
import {Router, Route, Switch} from 'dva/router'
import Link from 'umi/link';
import Header from './Header'
import Foot from './Footer'
import './index.scss';
import LeftMenus from '../config/LeftMenu'
import { Component } from 'react';
import login from '../pages/login/index'
import setpages from '../pages/setpages/index'
import testpages from '../pages/testpages/index'
import manageTopics from '../pages/manageTopics/index'
import manageTips from '../pages/manageTips/index'
import manageTeachers from '../pages/manageTeachers/index'
import manageProvince from '../pages/manageProvince/index'
import manageDic from '../pages/manageDic/index'

const { Content, Sider } = Layout;
const MenuItem = Menu.Item;


class BasicLayout extends Component{
    constructor(props){
      super(props)
      this.state = {
        userName:'admin呀'
      }
    }
    // 退出登录
    confirmSignOutHandler = (event) =>{
      console.log('确定退出')
    }
    cancelSignOutHandler = () =>{
      console.log('取消退出')
    }
    render(){
      const {userName} = this.state;
      console.log(this.props)
      const { history } = this.props
      // const {children,location} = this.props;
      // console.log('router pathname',location.pathname);
      // if(location.pathname === '/login'){
      //   return children
      // }else if(location.pathname === '/setPages'){
      //   return children
      // }
      return (
        <div className="layout_container">
          <Header userName={userName} confirmSignOut={(event)=>this.confirmSignOutHandler(event)} cancelSignOut={this.cancelSignOutHandler} />
          <Layout>
            <Sider> 
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                {
                  LeftMenus.map((item, idx) => {
                    return (
                      <MenuItem key={idx}>
                        <Icon type={item.icon} />
                        <span className="nav-text">
                          <Link to={item.path}>{item.tabTxt}</Link>
                        </span>
                      </MenuItem>
                    )
                  })
                }
              </Menu>
            </Sider>
            <Layout>
              <Content>
                <Router history={history}>
                  <Switch>
                    <Route exact path="/"/>
                    <Route path="/login" component={login} />
                    <Route path="/setpages" component={setpages} />
                    <Route path="/testpages" component={testpages} />
                    <Route path="/manageTopics" component={manageTopics} />
                    <Route path="/manageTips" component={manageTips} />
                    <Route path="/manageTeachers" component={manageTeachers}  />
                    <Route path="/manageProvince" component={manageProvince} />
                    <Route path="/manageDic" component={manageDic} />
                  </Switch>
                </Router>
              </Content>
              <Foot />
            </Layout>
          </Layout>
        </div>
      )
    }
}

export default BasicLayout;
