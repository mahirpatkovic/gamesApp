import React from 'react'
import { Icon, Table } from 'semantic-ui-react'

function TableLanguageInfo(props) {
    const english = props.english;
    const german = props.german;
    const portugese = props.portugese;
    const spanish = props.spanish;
    const turkish = props.turkish;
    
    return (
        <Table celled structured>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan='2'>Languages</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Interface</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Audio</Table.HeaderCell>
                    <Table.HeaderCell colSpan='3'>Subtitles</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>English</Table.Cell>
                    <Table.Cell textAlign="center">{english.interface === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{english.audio === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{english.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>German</Table.Cell>
                    <Table.Cell textAlign="center">{german.interface === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{german.audio === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{german.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Portugese</Table.Cell>
                    <Table.Cell textAlign="center">{portugese.interface === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{portugese.audio === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{portugese.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Spanish</Table.Cell>
                    <Table.Cell textAlign="center">{spanish.interface === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{spanish.audio === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{spanish.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Turkish</Table.Cell>
                    <Table.Cell textAlign="center">{turkish.interface === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{turkish.audio === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                    <Table.Cell textAlign="center">{turkish.subtitles === 'yes' ? <Icon name='checkmark' /> : ''}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}
export default TableLanguageInfo;