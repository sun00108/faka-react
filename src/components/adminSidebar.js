import React from "react";

import { Layout, Nav } from '@douyinfe/semi-ui';

export default function AdminSidebar() {

    const { Sider } = Layout;

    // Nav.item 应该渲染为 <Link /> 而不是 <a />

    return (
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)'}}>
            <Nav style={{ maxWidth: 220, height: 'calc(100vh - 60px)' }} // 这个实现方法好怪啊，有人帮我修修么？
                defaultSelectedKeys={['Home']}
                footer={{
                    collapseButton: true,
                }}>
                <Nav.Item link={"/admin"} itemKey="Home" text="首页" />
                <Nav.Item link={""} itemKey="User" text="用户管理" />
                <Nav.Item link={"/admin/product"} itemKey="Product" text="产品管理" />
                <Nav.Item link={"/admin/order"} itemKey="Order" text="订单管理" />
                <Nav.Item link={""} itemKey="Setting" text="设置" />
            </Nav>
        </Sider>
    )

}