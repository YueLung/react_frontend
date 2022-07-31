import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
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

const { Header, Sider, Content } = Layout;

function getItem(key, name, link, icon, children) {
  return {
    key,
    label: (<Link to={link}>{name}</Link>),
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

  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}  >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
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
                <Route path="home" element={<HomePage />} />
                <Route path="apiTest" element={<ApiTestPage />} />
                <Route path="shopping/manage" element={<ManagePage />} />
                <Route path="shopping/cart" element={<CartPage />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;