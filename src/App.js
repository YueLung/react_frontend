import { Routes, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import menu from './assets/menu.json';
import Home from './pages/Home';
import ApiTest from './pages/ApiTest';
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
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
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
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="apiTest" element={<ApiTest />} />
            </Routes>

          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;