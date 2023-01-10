import React, { Component, Fragment } from 'react';

import { Col, Row } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';

import axios from 'axios';

export default function ProductIndex() {

    const { Title } = Typography;

    const [ productList, setProductList ] = React.useState([]);

    const fetchProducts = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/products').then( res => {
            setProductList(res.data)
            console.log(res.data)
        })
    }

    React.useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Fragment>
            <div class={'grid'}>
                <Row type={'flex'} justify={'center'}>
                    <Col span={12}>
                        <Title style={{ margin: '8px 0' }} >Product Index</Title>
                    </Col>
                </Row>
                <Row type={'flex'} justify={'center'}>
                    <Col span={12}>
                        <Title style={{ margin: '8px 0' }} >Product Index</Title>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}