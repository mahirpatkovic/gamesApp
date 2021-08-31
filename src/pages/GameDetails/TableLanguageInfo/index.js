import React from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { Card, Col, Row } from 'antd';

function TableLanguageInfo(props) {
    const english = props.english;
    const german = props.german;
    const portugese = props.portugese;
    const spanish = props.spanish;
    const turkish = props.turkish;

    return (
        <Card>
            <Row>
                <Col span={6}>
                    <strong>Languages</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    <strong>Interface</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    <strong>Audio</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    <strong>Subtitles</strong>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>English</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {english.interface === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {english.audio === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {english.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>German</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {german.interface === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {german.audio === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {german.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>Portugese</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {portugese.interface === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {portugese.audio === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {portugese.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>Spanish</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {spanish.interface === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {spanish.audio === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {spanish.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>Turkish</strong>
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {turkish.interface === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {turkish.audio === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
                <Col span={6} style={{textAlign: 'center'}}>
                    {turkish.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}
                </Col>
            </Row>
        </Card>
    )
}
export default TableLanguageInfo;