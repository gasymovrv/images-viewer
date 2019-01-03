import React, {Fragment} from 'react';
import ViewerBox from "./components/ViewerBox";
import {Container, Col, Row, Nav, NavItem, Navbar, NavLink} from "reactstrap";

export default class App extends React.Component {
    render() {
        return (
            <div className='section'>
                <Container>
                    <Row>
                        <Col sm='3'>
                            <Navbar color="faded" light>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink href="/components/">Папка 1</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/components/">Папка 1</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/components/">Папка 1</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/components/">Папка 1</NavLink>
                                    </NavItem>
                                </Nav>
                            </Navbar>
                        </Col>
                        <Col sm='9'>
                            <ViewerBox/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
