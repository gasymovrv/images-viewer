import React from 'react';
import ViewerBox from "./components/ViewerBox";
import {Container, Col, Row} from "reactstrap";
import Navigation from "./components/Navigation";

export default class App extends React.Component {
    state = {
        activeDir: null
    };

    setActiveDir = (dir)=>{
        this.setState({activeDir:dir})
    };

    render() {
        return (
            <div className='section'>
                <Container fluid>
                    <Row>
                        <Col xs="3">
                            <Navigation dirs={null} setActiveDir={this.setActiveDir}/>
                        </Col>
                        <Col  xs="9">
                            <ViewerBox dir={this.state.activeDir}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
