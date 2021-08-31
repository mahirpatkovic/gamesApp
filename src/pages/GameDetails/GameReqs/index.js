import React, { useState } from 'react';
import { Accordion, Header, Table, Icon } from 'semantic-ui-react';


function GameReqs(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const winMinimum = props.winMinimum;
    const winRecommended = props.winRecommended;
    const macMinimum = props.macMinimum;
    const macRecommended = props.macRecommended;

    const windowsRequirements = <Table basic='very' celled collapsing>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell rowSpan='2'>System Requirements</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Minimum</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Recommended</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <Header as='h5'>
                        <Header.Content>
                            OS
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>{winMinimum.os}</Table.Cell>
                <Table.Cell>{winRecommended.os}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <Header as='h5'>
                        <Header.Content>
                            CPU
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>{winMinimum.processor}</Table.Cell>
                <Table.Cell>{winRecommended.processor}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <Header as='h5'>
                        <Header.Content>
                            Memory
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>{winMinimum.memory} RAM</Table.Cell>
                <Table.Cell>{winRecommended.memory} RAM</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <Header as='h5'>
                        <Header.Content>
                            Graphics
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>{winMinimum.graphics}</Table.Cell>
                <Table.Cell>{winRecommended.graphics}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>
                    <Header as='h4'>
                        <Header.Content>
                            Storage
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>{winMinimum.storage}</Table.Cell>
                <Table.Cell>{winRecommended.storage}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table >;

    const macRequirements = <Table basic='very' celled collapsing>
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell rowSpan='2'>System Requirements</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Minimum</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Recommended</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        <Table.Row>
            <Table.Cell>
                <Header as='h5'>
                    <Header.Content>
                        OS
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{macMinimum.os}</Table.Cell>
            <Table.Cell>{macRecommended.os}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Header as='h5'>
                    <Header.Content>
                        CPU
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{macMinimum.processor}</Table.Cell>
            <Table.Cell>{macRecommended.processor}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Header as='h5'>
                    <Header.Content>
                        Memory
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{macMinimum.memory} RAM</Table.Cell>
            <Table.Cell>{macRecommended.memory} RAM</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Header as='h5'>
                    <Header.Content>
                        Graphics
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{macMinimum.graphics}</Table.Cell>
            <Table.Cell>{macRecommended.graphics}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Header as='h4'>
                    <Header.Content>
                        Storage
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{macMinimum.storage}</Table.Cell>
            <Table.Cell>{macRecommended.storage}</Table.Cell>
        </Table.Row>
    </Table.Body>
</Table >;



    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;

        setActiveIndex(newIndex)
    }
    
    return (
        <div>
            <Accordion styled style={{width: '100%'}}>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleClick}
                >
                    <Icon name='dropdown' />
                   Windows Requirements
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0} >
                    {windowsRequirements}
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleClick}
                >
                    <Icon name='dropdown' />
                    Mac OS Requirements
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    {macRequirements}
                </Accordion.Content>
            </Accordion>
        </div>
    )
}
export default GameReqs;