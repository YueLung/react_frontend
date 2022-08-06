import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import 'antd/dist/antd.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './App.css';
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
    icon: key.split('-').length > 2 ? null : <AppstoreOutlined />,
    children: children ? children.map((child, index) => {
      return getItem(child.key, child.name, child.link, child.icon, child.children);
    }) : null
  }
}

const menuItems = menu.map((data, i) => {
  const key = data.key;
  return getItem(key, data.name, data.link, data.icon, data.children)
})

const App = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [contentStyle, setContentStyle] = useState({ width: '100%', marginLeft: 0 });
  const location = useLocation();

  useEffect(() => {
    // 若為空字串 則設為home
    const currentLink = location.pathname.substring(1) || 'home';

    menu.forEach(m => {
      if (m.link && m.link.includes(currentLink)) {
        setSelectedKeys([m.key]);
      }
      else {
        // 先假設目前只有一個子項目
        m.children?.forEach(c => {
          if (c.link && c.link.includes(currentLink)) {
            setOpenKeys([m.key]);
            setSelectedKeys([c.key]);
          }
        })
      }
    });
  }, []);

  useEffect(() => {
    if (selectedKeys.length && collapsed === false) {
      let ary = selectedKeys[0].split('-');
      const openKey = `${ary[0]}-${ary[1]}`;
      setOpenKeys([openKey]);
    }

  }, [collapsed])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  let onCollapse = (value) => {
    setCollapsed(value);
    setOpenKeys([]);

    // setContentStyle((prev) => {
    //   if (prev.marginLeft === 200)
    //     return { width: '100%', marginLeft: 80 }
    //   else
    //     return { width: '100%', marginLeft: 200 }
    // })
  }

  if (selectedKeys.length === 0) return;

  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }} >
        <Sider collapsed={collapsed} onCollapse={(value) => { onCollapse(value) }}
          style={{
            overflow: 'auto',
            // height: '100%',
            // position: 'fixed',
          }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            // defaultOpenKeys={[]}
            defaultSelectedKeys={selectedKeys}
            // selectedKeys={selectedKeys}
            onSelect={(value) => { setSelectedKeys([value.key]); }}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
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