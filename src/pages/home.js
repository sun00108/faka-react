import React, { Component, Fragment } from 'react';
import { useNavigate } from 'react-router-dom'

import {Card, Button, Row, Col} from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';

import axios from 'axios';
import { useAtom } from 'jotai'
import { isLoginAtom, jwtTokenAtom } from '../atom'

import AppHeader from "../components/header";

export default function Home() {

    const { Paragraph, Title } = Typography;
    const { Header, Footer, Content } = Layout;
    const { Meta } = Card;

    const selectedCardStyle = {
        borderColor: '#E16B8C',
        borderWidth: '2px'
    }

    const [ isLogin, setIsLogin ] = useAtom(isLoginAtom)
    const [ , setJwtToken ] = useAtom(jwtTokenAtom)
    const [ productGroupList, setProductGroupList ] = React.useState([]);
    const [ productList, setProductList ] = React.useState([]);
    const [ selectedProductGroup, setSelectedProductGroup ] = React.useState(1);

    const navigate = useNavigate();

    const fetchProductGroups = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/productgroups').then( res => {
            if(res.data.code == 200) {
                setProductGroupList(res.data.data)
                setProductList(res.data.data[0].products)
                console.log(res.data.data[0])
            } else {
                alert(res.data.message)
            }
        })
    }

    React.useEffect(() => {
        fetchProductGroups()
    }, [])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className={'grid'}>
                    <Row type={'flex'} justify={'center'}>
                        <Col xs={20} lg={12}>
                            <Title style={{ margin: '50px 0 0 0' }} >
                                先辈杂货铺
                            </Title>
                            <Paragraph style={{ margin: '25px 0 50px 0' }}>
                                没准可以放点公告什么的。
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row type={'flex'} justify={'center'} style={{ margin: '0 0 50px 0' }}>
                        <Col xs={20} lg={12}>
                            <Row type={'flex'}>
                                {
                                    productGroupList.map((productGroup) => {
                                        return (
                                            <Col xs={12} lg={6}>
                                                <Card key={productGroup.id} shadows={'hover'} style={ selectedProductGroup == productGroup.id ? selectedCardStyle : {}}
                                                      bodyStyle={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                                                      onClick={() => {
                                                          setSelectedProductGroup(productGroup.id)
                                                          setProductList(productGroup.products)
                                                      }}>
                                                    <Meta title={productGroup.name} />
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row type={'flex'} justify={'center'}>
                        <Col xs={20} lg={12}>
                            <Row type={'flex'}>
                                {
                                    productList.map((product) => {
                                        return (
                                            <Col xs={12} lg={6}>
                                                <Card shadows='always'
                                                      bodyStyle={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                    <Title heading={5}>{product.name}</Title>
                                                    <br/>
                                                    <Paragraph>{product.description}</Paragraph>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )

}