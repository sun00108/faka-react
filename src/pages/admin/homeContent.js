import {Card, Col, Row} from "@douyinfe/semi-ui";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {isAdminAtom, jwtTokenAtom} from "../../atom";
import axios from "axios";

export default function AdminHomeContent() {

    const navigate = useNavigate()

    const [ isAdmin ] = useAtom(isAdminAtom)
    const [ jwtToken ] = useAtom(jwtTokenAtom)

    const checkAdmin = () => {
        if (!isAdmin) {
            alert("您不是管理员。")
            navigate('/')
        }
    }

    const [ migration, setMigration ] = React.useState({})

    const checkMigration = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/migration', {
            headers: {
                'Authorization': jwtToken
            }
        }).then( res => {
            console.log(res.data)
            if (res.data.code != 404) {
                alert("有未完成的MIGRATION。")
            }
            setMigration(res.data)
        })
    }

    React.useEffect(() => {
        checkAdmin()
        checkMigration()
    }, [])

    return (
        <div className={'grid'}>
            <Row type={'flex'} justify={'center'} style={{margin: '50px 0'}}>
                <Col xs={20} lg={12}>
                    <Card title={"Migration 系统状态"}>
                        <p>{JSON.stringify(migration)}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}