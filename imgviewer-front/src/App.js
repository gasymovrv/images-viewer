import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Container, Col, Row} from "reactstrap";

import ViewerBox from "./components/ViewerBox";
import Navigation from "./components/Navigation";

export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className='section'>
                    <Container fluid>
                        <Row>
                            <Col xs="3" className='nav-sidebar'>
                                <Switch>
                                    <Route exact path='/' component={(props)=><Navigation dirs={null} {...props}/>} />
                                    <Route path={`/dirs/:id(\\d+)`} component={(props)=><Navigation dirs={null} {...props}/>} />
                                </Switch>
                            </Col>
                            <Col xs="9">
                                <Route path={`/dirs/:id(\\d+)`} component={ViewerBox}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </HashRouter>
        )
    }
}
