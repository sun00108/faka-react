import React, { Component, Fragment } from 'react';

import { Card, Button } from '@douyinfe/semi-ui';
import { Form, Tooltip } from '@douyinfe/semi-ui';

import { IconHelpCircle } from '@douyinfe/semi-icons';

import axios from 'axios';

export default function AdminAuthRegister() {

    // 这个页面不应该存在。

    const styleCenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }

    const [ username, setUsername ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    const submitAdminRegister = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/auth/register-admin', {
            username: username,
            email: email,
            password: password
        }).then( res => {
            if (res.data.code == 200) {
                window.location.href = '/admin/auth/login'
            } else {
                alert(res.data.message)
            }
        })
    }

    return (
        <div style={styleCenter}>
            <Card>
                <h1>Admin Register</h1>
                <Form layout='vertical'>
                    <Form.Input field='username' label='用户名' onChange={(e) => setUsername(e)}/>
                    <Form.Input field='email' label='邮箱' onChange={(e) => setEmail(e)}/>
                    <Form.Input
                        field='password'
                        label={{
                            text: '密码',
                            extra: <Tooltip content='详情'><IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }}/></Tooltip>
                        }}
                        mode="password"
                        onChange={(e) => setPassword(e)}
                    />
                    <Form.Input
                        field='password'
                        label={'确认密码'}
                        mode="password"
                    />
                    <br/><br/>
                    <Button type="primary" htmlType="submit" className="btn-margin-right" style={{margin: '0 auto', width: '100%'}} onClick={submitAdminRegister}>注册</Button>
                </Form>
            </Card>
        </div>
    )
}