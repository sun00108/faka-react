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

export default function OrderIndex() {

    const {Paragraph, Title} = Typography;
    const {Header, Footer, Content} = Layout;
    const {Meta} = Card;

    const {id} = useParams();
    const [ isLogin, setIsLogin ] = useAtom(isLoginAtom)
    const [ jwtToken, setJwtToken ] = useAtom(jwtTokenAtom)
    const [ accessCode, setAccessCode ] = React.useState('')
    const [ accessCodeErrorMessage, setAccessCodeErrorMessage ] = React.useState('')

    const navigate = useNavigate()

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className={'grid'}>
                    { !isLogin ?
                        <Row type={'flex'} justify={'center'}>
                            <Col xs={20} lg={12}>
                                <Card style={{ margin: '50px 0 0 0' }}>
                                    <Meta title={"订单提取"} />
                                    <Form style={{ margin: '16px 0 0 0'}}>
                                        <Form.Input field='accesscode'
                                                    onChange={(e) => {
                                                        setAccessCode(e)
                                                    }}
                                                    label={"输入 Access Code"}  />
                                        <p style={{ color: "red" }}>{accessCodeErrorMessage}</p>
                                        <Button type="primary"
                                                onClick={() => {
                                                    if (accessCode == '') {
                                                        setAccessCodeErrorMessage("Access Code 不能为空")
                                                        return
                                                    } else {
                                                        setAccessCodeErrorMessage("")
                                                        navigate('/order/guest/' + accessCode)
                                                    }
                                                }}>
                                            提取订单
                                        </Button>
                                    </Form>
                                </Card>
                            </Col>
                        </Row> : <br />
                    }
                </div>
            </Content>
        </Layout>
    )

}