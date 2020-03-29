import React,{Component, useState} from 'react';
import { Layout,Menu, Button} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';

import '../css/layout.css';
import { BrowserRouter, Route,Switch, Link ,useHistory} from 'react-router-dom';
import MenuComponent from '../_components/MenuComponent';
import CreateFoodComponent from '../_components/CreateFoodComponent';
import RestarauntComponent from '../_components/RestarauntComponent';
import CreateRestarauntComponent from '../_components/CreateRestaurantComponent';
import OrderComponent from '../_components/OrderComponent';
import HomeComponent from '../_components/HomeComponent';
import CreateOrderComponent from '../_components/CreateOrderComponent';
const { Header, Footer, Sider, Content } = Layout;

const MyLayout =(props)=>{

    const [collapsed,setCollapsed] =  useState(false);
    let history = useHistory();
    // constructor(props){
    //     super(props);
    //     this.state={
    //         collapsed:false
    //     }
    // }
    const toggle = () => {
        setCollapsed(!collapsed);
        // this.setState({collapsed:!this.state.collapsed});
    };
    const handleMenuClick =(e)=>{

        console.log(e);
        history.push(e.key);
    }
    
        return (  
            <Layout>       

                
            <Sider trigger={null} collapsible collapsed={collapsed}
            style={{height: '100vh'}}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={handleMenuClick}>
                <Menu.Item key="/home">
                <UserOutlined />
                <span><Link to="/">Home</Link></span>                
                </Menu.Item>
                <Menu.Item key="/restaurant">
                <VideoCameraOutlined />
                <span><Link to ="/restaurant">Restaraunts</Link></span>                
                </Menu.Item>
                <Menu.Item key="/food">
                <VideoCameraOutlined />
                <span><Link to ="/food">Foods</Link></span>                
                </Menu.Item>
                <Menu.Item key="/order">
                <UploadOutlined />
                <span>Orders</span>
                </Menu.Item>
            </Menu>
            </Sider> 
              
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0,backgroundColor:"#fff"}}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                    })}                
                </Header>   
            
            <Content
                className="site-layout-background"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                }}
            >
                {                    
                        <Switch>
                            <Route path="/order" exact component={OrderComponent}/>
                            <Route path="/order/create" component={CreateOrderComponent}/>
                            <Route path="/restaurant/create" component={CreateRestarauntComponent}/>
                            <Route path="/food/create" component={CreateFoodComponent}/>
                            <Route path="/food" exact component={MenuComponent}/>
                            <Route path="/restaurant" exact component={RestarauntComponent}/>
                            <Route path="/home" exact component={HomeComponent}/>
                        </Switch>                    
                }
            </Content>
            </Layout>
            </Layout>
        )    
}

export {MyLayout};