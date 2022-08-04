import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import menu from './assets/menu.json';
import HomePage from './pages/home/HomePage';
import ApiTestPage from './pages/apiTest/ApiTestPage';
import ManagePage from "pages/shopping/manage/ManagePage";
import CartPage from "pages/shopping/cart/CartPage";
import GomokuPage from 'pages/gomoku/GomokuPage';

const { Header, Sider, Content } = Layout;

function getItem(key, name, link, icon, children) {
  return {
    key,
    label: link ? (<Link to={link}>{name}</Link>) : name,
    icon: String(key).includes('-') ? null : <AppstoreOutlined />,
    children: children ? children.map((child, index) => {
      return getItem(`${key}-${index}`, child.name, child.link, child.icon, child.children);
    }) : null
  }
}

const menuItems = menu.map((data, i) => {
  const key = data.children ? `sub${String(i + 1)} ` : i + 1;
  return getItem(key, data.name, data.link, data.icon, data.children)
})

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentStyle, setContentStyle] = useState({ width: '100%', marginLeft: 200 });
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath)

  let onCollapse = (value) => {
    setCollapsed(value);
    setContentStyle((prev) => {
      if (prev.marginLeft === 200)
        return { width: '100%', marginLeft: 80 }
      else
        return { width: '100%', marginLeft: 200 }
    })
  }

  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }} >
        <Sider collapsed={collapsed} onCollapse={(value) => { onCollapse(value) }}
          style={{
            overflow: 'auto',
            height: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Sider>
        <Layout className="site-layout" style={contentStyle}>
          <Header className="site-layout-background"
            style={{
              padding: 0,
              // position: 'fixed',
              zIndex: 1,
              width: '100%',
              // color: '#3a86ff'
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => onCollapse(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              overflow: 'initial',
              padding: 24,
              // minHeight: 36
            }}
          >
            <div>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="home" element={<HomePage />} />
                <Route path="apiTest" element={<ApiTestPage />} />
                <Route path="shopping/manage" element={<ManagePage />} />
                <Route path="shopping/cart" element={<CartPage />} />
                <Route path="ai/gomoku" element={<GomokuPage />} />
                <Route path="*" element={
                  <div>
                    <h2>404 Page not found</h2>
                  </div>
                }
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;