import React, { Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { Card, Button, Row, Col, Space, Divider } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { SideSheet, InputNumber, Input } from '@douyinfe/semi-ui';
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

    const [visible, setVisible] = React.useState(false);

    const selectedCardStyle = {
        borderColor: process.env.REACT_APP_COLOR,
        borderWidth: '2px'
    }

    const [ isLogin, setIsLogin ] = useAtom(isLoginAtom)
    const [ jwtToken, setJwtToken ] = useAtom(jwtTokenAtom)
    const [ productGroupList, setProductGroupList ] = React.useState([]);
    const [ productList, setProductList ] = React.useState([]);
    const [ selectedProductGroup, setSelectedProductGroup ] = React.useState(1);
    const [ productPurchase, setProductPurchase ] = React.useState({});
    const [ productPurchaseQuantity, setProductPurchaseQuantity ] = React.useState(1);
    const [ guestOrderEmail, setGuestOrderEmail ] = React.useState('');
    const [ productPurchaseErrorMessage, setProductPurchaseErrorMessage ] = React.useState('');

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

    const submitProductPurchase = () => {
        setProductPurchaseErrorMessage('')
        let productPurchaseData
        if(!isLogin) {
            if(!guestOrderEmail) {
                setProductPurchaseErrorMessage('请输入邮箱地址。')
                return
            }
            productPurchaseData = {
                productId: productPurchase.id,
                quantity: productPurchaseQuantity,
                email: guestOrderEmail
            }
        } else {
            axios.defaults.headers.common['Authorization'] = jwtToken;
            productPurchaseData = {
                productId: productPurchase.id,
                quantity: productPurchaseQuantity
            }
        }
        axios.post( process.env.REACT_APP_API_HOST + '/api/orders/submit', productPurchaseData).then( res => {
            if(res.data.code == 200) {
                alert('下单成功')
                if (isLogin) {
                    const orderId = res.data.data.id
                    navigate('/order/' + orderId)
                } else {
                    const accessCode = res.data.data.accessCode
                    navigate('/order/guest/' + accessCode )
                }
            } else {
                alert(res.data.message)
            }
        })
    }

    React.useEffect(() => {
        fetchProductGroups()
    }, [])

    const sidePurchaseFooter = (
        <div>
        </div>
    )

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
                                                                              <Button theme='solid' type='primary'
                                                                                      onClick={() => {
                                                                                          setProductPurchase(product)
                                                                                          setVisible(true)
                                                                                      }}>
                                                                                  购买
                                                                              </Button>

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
                <SideSheet title={productPurchase.name} visible={visible}
                           onCancel={() => setVisible(false)}
                           footer={sidePurchaseFooter}
                >
                    <Paragraph>{productPurchase.description}</Paragraph>
                    <br />
                    <Form>
                        <Form.InputNumber field='number' initValue={productPurchaseQuantity} min={1} max={productPurchase.stock}
                                     onNumberChange={(e) => setProductPurchaseQuantity(e)}
                                     style={{ width: 80 }} label={{ text: '购买数量', required: true }}/>
                        {
                            isLogin ? <div></div> : <Form.Input field='email' label={{ text: '邮箱地址', required: true }} style={{ width: '80%' }} onChange={(e) => setGuestOrderEmail(e)}/>
                        }
                    </Form>
                    <Divider margin='12px'/>
                    <p style-={{ display: 'flex', justifyContent: 'flex-end', textColor: 'red' }}>{productPurchaseErrorMessage}</p>
                    <p style={{ display: 'flex', justifyContent: 'flex-end' }}>合计 ￥ {productPurchase.price*productPurchaseQuantity}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button theme="solid" onClick={() => submitProductPurchase()}>购买</Button>
                    </div>
                </SideSheet>
            </Content>
        </Layout>
    )

}