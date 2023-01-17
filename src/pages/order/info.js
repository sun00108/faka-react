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
    const [ jwtToken, setJwtToken ] = useAtom(jwtTokenAtom)

    const [ order, setOrder ] = React.useState({})
    const [ gateways, setGateways ] = React.useState([]);

    const newTab = (url) => {
        window.open(url, '_blank');
    }

    const fetchOrderInfo = () => {
        axios.defaults.headers.common['Authorization'] = jwtToken;
        axios.get( process.env.REACT_APP_API_HOST + '/api/orders/' + id ).then( res => {
            if (res.data.code == 200) {
                console.log(res.data.data)
                setOrder(res.data.data)
                //setGateways(res.data.data.gateways)
            } else {
                alert(res.data.message)
            }
        })
    }

    const submitOrderPayment = (gatewayID) => {
        axios.defaults.headers.common['Authorization'] = jwtToken;
        axios.post( process.env.REACT_APP_API_HOST + '/api/orders/' + id + '/pay', {
            gatewayId: gatewayID
        }).then( res => {
            if (res.data.code == 200) {
                newTab(res.data.data.paymentUrl)
            } else {
                alert(res.data.message)
            }
        })
    }

    React.useEffect(() => {
        fetchOrderInfo()
    }, [])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className={'grid'}>
                    <Row type={'flex'} justify={'center'}>
                        <Col xs={20} lg={12}>
                            <Card style={{ margin: '50px 0 0 0' }}>
                                <Meta title={"订单 #" + id} />
                                <p>
                                    {
                                        gateways.length > 0 ? (
                                            gateways.map( (gateway) => {
                                                return (
                                                <Button onClick={() => {submitOrderPayment(gateway.id)}}>{gateway.friendlyName}</Button>
                                                )
                                                })
                                        ) : <span>暂无可用支付方式</span>
                                    }
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}