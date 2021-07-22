import React from 'react'
import { Header, Table, Icon } from 'semantic-ui-react'

function TableInfo(props) {
    return (

        <Table basic='very' celled collapsing>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            <Icon name='tags'/>
                            <Header.Content>
                                Genre
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{props.game.genre}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            <Icon name='clock outline'/>
                            <Header.Content>
                                Release Date
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{props.game.releaseDate}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            <Icon name='settings'/>
                            <Header.Content>
                                Developer
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{props.game.developer}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            <Icon name='globe'/>
                            <Header.Content>
                                Publisher
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{props.game.publisher}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            <Icon name='tv'/>
                            <Header.Content>
                                Platforms
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{props.game.platform}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            <Icon name='users'/>
                            <Header.Content>
                                Modes
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{props.game.modes}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}

export default TableInfo;