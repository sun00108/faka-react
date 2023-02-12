import React, { Component, Fragment } from 'react';
import {useNavigate, Link, Outlet} from 'react-router-dom'

import { Card, Button, Row, Col, Space, Divider } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { SideSheet, InputNumber, Input } from '@douyinfe/semi-ui';
import { Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';

import axios from 'axios';
import { useAtom } from 'jotai'
import { isLoginAtom, jwtTokenAtom, isAdminAtom } from '../../atom'

import AppHeader from "../../components/header";
import AdminSidebar from "../../components/adminSidebar";

export default function AdminHome() {

    const { Paragraph, Title } = Typography;
    const { Header, Footer, Content, Sider } = Layout;
    const { Meta } = Card;

    return(
        <Layout className="components-layout-demo">
            <AppHeader />
            <Layout>
                <AdminSidebar />
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )

}