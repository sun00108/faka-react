import {Layout, Nav, Dropdown, Avatar, Button} from "@douyinfe/semi-ui";
import {IconHome, IconLive, IconSemiLogo, IconSetting} from "@douyinfe/semi-icons";
import React from "react";
import {Link} from "react-router-dom";

import {useAtom} from "jotai";
import {isLoginAtom, jwtTokenAtom, usernameAtom} from "../atom";

export default function AppHeader() {

    const { Header } = Layout;

    const [ isLogin, setIsLogin ] = useAtom(isLoginAtom)
    const [ , setJwtToken ] = useAtom(jwtTokenAtom)
    const [ username, setUsername ] = useAtom(usernameAtom)

    const logout = () => {
        setIsLogin(false)
        setJwtToken('')
        setUsername('')
    }

    return (
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <div>
                <Nav mode="horizontal" defaultSelectedKeys={['Home']}
                     footer={
                         <span>
                             { isLogin ?
                                 <Dropdown
                                     position="bottomRight"
                                     render={
                                         <Dropdown.Menu>
                                             <Dropdown.Item onClick={() => {logout()}}>退出登录</Dropdown.Item>
                                         </Dropdown.Menu>
                                     }
                                 >
                                     <Avatar size="small" color='light-blue' style={{ margin: 4 }}>{username.substring(0,2).toUpperCase()}</Avatar>
                                     <span>{username}</span>
                                 </Dropdown> :
                                 <Link to={ "/auth/login" } style={{ textDecoration: 'none'}}>
                                     <Button>登录</Button>
                                 </Link>
                             }
                         </span>
                     }>
                    <Nav.Header>
                        <IconSemiLogo style={{ fontSize: 36 }} />
                    </Nav.Header>
                    <Nav.Item link={"/"} itemKey="Home" text="首页" icon={<IconHome size="large" />} />
                    <Nav.Item link={"/order"} itemKey="Order" text="订单" icon={<IconSetting size="large" />} />
                </Nav>
            </div>
        </Header>
    )

}