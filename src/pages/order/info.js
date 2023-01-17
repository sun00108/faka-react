import React, { Component, Fragment } from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom'

import { Card, Button, Row, Col, Space, Divider } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { SideSheet, InputNumber, Input } from '@douyinfe/semi-ui';
import { Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';

import axios from 'axios';
import { useAtom } from 'jotai'
import { isLoginAtom, jwtTokenAtom } from '../../atom'

import AppHeader from "../../components/header";

export default function OrderInfo() {

    const { Paragraph, Title } = Typography;
    const { Header, Footer, Content } = Layout;
    const { Meta } = Card;

    const { id } = useParams();

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                ORDER { id } INFO
            </Content>
        </Layout>
    )
}