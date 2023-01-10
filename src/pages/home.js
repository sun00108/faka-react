import React, { Component, Fragment } from 'react';
import { useNavigate } from 'react-router-dom'

import {Card, Button, Row, Col, Space} from '@douyinfe/semi-ui';
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
        borderColor: process.env.REACT_APP_COLOR,
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
                                {process.env.REACT_APP_SITE_NAME}
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
                    { productList.length > 0 ?
                        <Row type={'flex'} justify={'center'}>
                            <Col xs={20} lg={12}>
                                <Card>
                                    <Row type={'flex'} gutter={16}>
                                        {
                                            productList.map((product) => {
                                                return (
                                                    <Col xs={24} lg={12}>
                                                        <Card shadows='always'
                                                              style={{
                                                                  margin: '0 0 16px 0'
                                                              }}
                                                              bodyStyle={{
                                                                  display: 'flex',
                                                                  alignItems: 'center',
                                                                  justifyContent: 'space-between'
                                                              }}
                                                              title={product.name}
                                                              headerExtraContent={"库存: " + product.stock}
                                                              footerLine={true}
                                                              footerStyle={{
                                                                  display: 'flex',
                                                                  justifyContent: 'flex-end'
                                                              }}
                                                              footer={
                                                                  <Space>
                                                                      <Paragraph>￥{product.price}</Paragraph>
                                                                      {
                                                                          product.stock <= 0 ?
                                                                              <Button disabled>缺货</Button> :
                                                                              <Button theme='solid' type='primary'>购买</Button>
                                                                      }
                                                                  </Space>
                                                              }
                                                        >
                                                            <Paragraph ellipsis={{ expandable: true, collapsible: true, collapseText: '折叠' }} style={{ width: '100%' }}>
                                                                {product.description}
                                                            </Paragraph>
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        : <br /> // 这个实现有点怪
                    }
                </div>
            </Content>
        </Layout>
    )

}