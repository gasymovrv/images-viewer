import React from 'react';
import {
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem
} from 'reactstrap';
import {css} from '@emotion/core';
import {refresh} from '../../api/directoriesApi';
import {BeatLoader} from 'react-spinners';

const override = css`
    display: block;
    margin-left: calc(2vh);
    margin-top: calc(1vh);
`;

export default class Header extends React.Component {
    state = {
        refreshing: false,
        menuOpen: false
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
                history.replace('/');
                location.reload();
            })
            .catch((err) => {
                this.setState((prSt) => ({refreshing: !prSt.refreshing}));
                console.log(err);
                alert('Ошибка обновления (код 2)');
                history.replace('/');
                location.reload();
            });
    };

    setRootDirectory = () => {
        const {history} = this.props;
        history.push('/set-root');
    };

    toggleMenu = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    };

    render() {
        const {refreshing} = this.state;
        return (
            <Navbar dark expand="xs">
                <NavbarBrand href="#/">ImagesViewer</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <ButtonDropdown isOpen={this.state.menuOpen} toggle={this.toggleMenu}>
                            <DropdownToggle color="primary" caret>
                                Опции
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.refreshDirectories}>Обновить</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.setRootDirectory}>Изменить корневую директорию</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
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
