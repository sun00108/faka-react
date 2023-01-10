import React, { Component, Fragment } from 'react';
import { useNavigate } from 'react-router-dom'

import { Card, Button } from '@douyinfe/semi-ui';
import { Form, Tooltip } from '@douyinfe/semi-ui';

import { IconHelpCircle } from '@douyinfe/semi-icons';

import axios from 'axios';
import { useAtom } from 'jotai'
import { isLoginAtom, jwtTokenAtom, usernameAtom } from '../../atom'

export default function AuthLogin() {

    const styleCenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }

    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ isLogin, setIsLogin ] = useAtom(isLoginAtom)
    const [ , setJwtToken ] = useAtom(jwtTokenAtom)
    const [ , setUsernameAtom ] = useAtom(usernameAtom)

    const navigate = useNavigate();

    const submitAdminLogin = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/auth/login', {
            username: username,
            password: password
        }).then( res => {
            if (res.data.code == 200) {
                let token = res.headers['Authorization'];
                setIsLogin(true)
                setJwtToken(token)
                setUsernameAtom(username)
                navigate('/')
            } else {
                alert(res.data.message)
            }
        })
    }

    React.useEffect(() => {
        if (isLogin) {
            navigate('/')
        }
    }, [])

    return (
        <div style={styleCenter}>
            <Card>
                <h1>登录至<span style={{ color: process.env.REACT_APP_COLOR }}> {process.env.REACT_APP_SITE_NAME} </span></h1>
                <Form layout='vertical'>
                    <Form.Input field='username' label='用户名' onChange={(e) => setUsername(e)}/>
                    <Form.Input
                        field='password'
                        label={{
                            text: '密码',
                            extra: <Tooltip content='详情'><IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }}/></Tooltip>
                        }}
                        mode="password"
                        onChange={(e) => setPassword(e)}
                    />
                    <br/><br/>
                    <Button type="primary" htmlType="submit" className="btn-margin-right" style={{margin: '0 auto', width: '100%'}} onClick={submitAdminLogin}>登录</Button>
                </Form>
            </Card>
        </div>
    )

}