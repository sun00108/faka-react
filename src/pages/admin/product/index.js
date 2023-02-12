import React, { Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import {Card, Button, Row, Col, Space, Divider, Tabs, TabPane, Table, Modal} from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { SideSheet, InputNumber, Input } from '@douyinfe/semi-ui';
import { Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';

import axios from 'axios';
import { useAtom } from 'jotai'
import { isLoginAtom, jwtTokenAtom, isAdminAtom } from '../../../atom'

export default function AdminProductHome() {

    const navigate = useNavigate()

    const [ isAdmin ] = useAtom(isAdminAtom)
    const [ jwtToken ] = useAtom(jwtTokenAtom)

    const checkAdmin = () => {
        if (!isAdmin) {
            alert("您不是管理员。")
            navigate('/')
        }
    }

    const [ productGroupList, setProductGroupList ] = React.useState([])

    const [ productAddModalVisible, setProductAddModalVisible ] = React.useState(false)

    const fetchProductGroups = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/productgroups', {
            headers: {
                'Authorization': jwtToken
            }
        }).then( res => {
            if(res.data.code == 200) {
                setProductGroupList(res.data.data)
                console.log(res.data.data)
            } else {
                alert(res.data.message)
            }
        })
    }

    const [ productAddName, setProductAddName ] = React.useState("")
    const [ productAddDescription, setProductAddDescription ] = React.useState("")
    const [ productAddPrice, setProductAddPrice ] = React.useState(0)
    const [ productAddProductGroupId, setProductAddProductGroupId ] = React.useState(0)
    const [ productAddIsEnabled, setProductAddIsEnabled ] = React.useState(true)
    const [ productAddIsHidden, setProductAddIsHidden ] = React.useState(false)
    const [ productAddStock, setProductAddStock ] = React.useState(0)

    const submitProductAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/products', {
            name: productAddName,
            description: productAddDescription,
            price: productAddPrice,
            productGroupId: productAddProductGroupId,
            isEnabled: productAddIsEnabled,
            isHidden: productAddIsHidden,
            stock: productAddStock
        }, {
            headers: {
                'Authorization': jwtToken
            }
        })
    }

    const submitProductDelete = (id) => {
        axios.delete( process.env.REACT_APP_API_HOST + '/api/products/' + id, {
            headers: {
                'Authorization': jwtToken
            }
        }).then(
            res => {
                if(res.data.code == 204) {
                    alert("删除成功")
                    fetchProductGroups()
                } else {
                    alert(res.data.message)
                }
            }
        )
    }

    const productColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '产品名',
            dataIndex: 'name',
        },
        {
            title: '产品描述',
            dataIndex: 'description',
        },
        {
            title: '产品价格',
            dataIndex: 'price',
        },
        {
            title: '库存',
            dataIndex: 'stock',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record, index) => {
                return (
                    <Space>
                        <Button onClick={() => {navigate('/admin/product/' + record.id + '/edit')}}>编辑</Button>
                        <Button onClick={() => {submitProductDelete(record.id)}}>删除</Button>
                    </Space>
                )
            }
        }
    ]

    React.useEffect(() => {
        checkAdmin()
        fetchProductGroups()
    }, [])

    return(
        <Fragment>
            <div className={'grid'}>
                <Row type={'flex'} justify={'center'} style={{ margin: '50px 0' }}>
                    <Col xs={20} lg={12}>
                        <Card title={"产品管理"} headerExtraContent={<Button onClick={() => {setProductAddModalVisible(true)}}>新建产品</Button>}>
                            <Tabs type={"line"} style={{ marginTop: -20, marginBottom: -20 }}>
                                {
                                    productGroupList.map( (productGroup, index) => {
                                        return (
                                            <TabPane tab={productGroup.name} itemKey={productGroup.id}>
                                                <Table columns={productColumns} dataSource={productGroup.products} pagination={false} />
                                            </TabPane>
                                        )
                                    })
                                }
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal title="新增产品" visible={productAddModalVisible}
                onOk={() => {
                    setProductAddModalVisible(false);
                    submitProductAdd();
                }}
                onCancel={() => {
                    setProductAddModalVisible(false);
                }}
                closeOnEsc={true}
            >
                创建新产品
                <br />
                <Form layout="vertical">
                    <Form.Input field="name" label="产品名" onChange={(values) => setProductAddName(values)}/>
                    <Form.Input field="description" label="产品描述" onChange={(values) => setProductAddDescription(values)}/>
                    <Form.Input field="price" label="产品价格" onChange={(values) => setProductAddPrice(values)}/>
                    <Form.Input field="stock" label="库存" onChange={(values) => setProductAddStock(values)}/>
                </Form>
            </Modal>
        </Fragment>
    )

}