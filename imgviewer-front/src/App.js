import React, {Fragment} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Container, Col, Row, Button } from 'reactstrap';

import ViewerBox from './components/ViewerBox';
import Navigation from './components/Navigation';
import Header from './components/Header';
import InputRoot from "./components/InputRoot";



export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Fragment>
                    <Container>
                        <Row>
                            <Col xs="12" className='fixed-header'>
                                <Route component={Header}/>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col xs="3" className='fixed-sidebar'>
                                <Switch>
                                    <Route exact path='/'
                                           component={(props) => <Navigation directories={null} {...props}/>}/>
                                    <Route path={`/dirs/:id(\\d+)`}
                                           component={(props) => <Navigation directories={null} {...props}/>}/>
                                </Switch>
                            </Col>
                            <Col xs={{size: 9, offset: 3}} className="main-box">
                                <Route path={`/dirs/:id(\\d+)`} component={ViewerBox}/>
                                <Route path='/set-root' component={InputRoot}/>
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            </HashRouter>
        )
    }
}
