import React, { Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import {Card, Button, Row, Col, Space, Divider, Tabs, TabPane} from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { SideSheet, InputNumber, Input } from '@douyinfe/semi-ui';
import { Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';

import axios from 'axios';
import { useAtom } from 'jotai'
import { isLoginAtom, jwtTokenAtom, isAdminAtom } from '../../../atom'

import AppHeader from "../../../components/header";
import AdminSidebar from "../../../components/adminSidebar";

export default function AdminOrderHome() {

    const { Paragraph, Title } = Typography;
    const { Header, Footer, Content, Sider } = Layout;
    const { Meta } = Card;

    const navigate = useNavigate()

    const [ isAdmin ] = useAtom(isAdminAtom)
    const [ jwtToken ] = useAtom(jwtTokenAtom)

    const checkAdmin = () => {
        if (!isAdmin) {
            alert("您不是管理员。")
            navigate('/')
        }
    }

    const [ orderList, setOrderList ] = React.useState([])
    const [ orderListPerPage, setOrderListPerPage ] = React.useState(10)
    const [ orderListPage, setOrderListPage ] = React.useState(1)

    const fetchOrders = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/orders?perPage=' + orderListPerPage + '&page=' + orderListPage, {
            headers: {
                'Authorization': jwtToken
            }
        }).then( res => {
            if(res.data.code == 200) {
                setOrderList(res.data.data)
                console.log(res.data.data)
            } else {
                alert(res.data.message)
            }
        })
    }

    React.useEffect(() => {
        checkAdmin()
        fetchOrders()
    }, [])

    return(
        <div className={'grid'}>
            <Row type={'flex'} justify={'center'} style={{ margin: '50px 0' }}>
                <Col xs={20} lg={12}>
                    <Card title={"订单管理"}>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}