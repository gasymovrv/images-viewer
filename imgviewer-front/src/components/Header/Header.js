import React from 'react';
import {Button, Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {css} from '@emotion/core';
import {refresh} from '../../api/directoriesApi';
import {BeatLoader} from 'react-spinners';

const override = css`
    display: block;
    margin-left: 2vh;
    margin-top: 1vh;
`;

export default class Header extends React.Component {
    state = {
        refreshing: false
    };

    refreshDirectories = () => {
        const {history} = this.props;
        this.setState({refreshing: true});
        refresh()
            .then((response) => {
                if (response.status !== 200) {
                    console.log(response);
                    alert('Ошибка обновления (код 1)');
                }
                this.setState((prSt) => ({refreshing: !prSt.refreshing}));
                history.push('/')
            })
            .catch((err) => {
                this.setState((prSt) => ({refreshing: !prSt.refreshing}));
                console.log(err);
                alert('Ошибка обновления (код 2)');
                history.push('/')
            });
    };

    render() {
        const {refreshing} = this.state;
        return (
            <Navbar dark expand="xs">
                <NavbarBrand href="#/">ImagesViewer</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Button onClick={this.refreshDirectories} color="light">
                            Обновить
                        </Button>
                    </NavItem>
                    <NavItem>
                        {refreshing &&
                        <BeatLoader
                            css={override}
                            sizeUnit={'px'}
                            size={10}
                            color={'#f1f1ef'}
                            loading={this.state.loading}
                        />}
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
};
