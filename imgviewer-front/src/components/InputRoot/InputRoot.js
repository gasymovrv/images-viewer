import React from 'react';
import {Alert, Button, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {setRootDir} from "../../api/directoriesApi";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/core";

const override = css`
    display: block;
    margin-left: calc(2vh);
    margin-top: calc(1vh);
`;

export default class InputRoot extends React.Component {
    constructor(props){
        super(props);
        let rootPath = localStorage.getItem('rootPath');
        if(!rootPath){
            rootPath = ''
        }
        this.state = {
            rootPath: rootPath,
            scanning: false,
            error: false
        };
    }

    handlerChange = (e) => {
        this.setState({rootPath: e.target.value});
    };

    handlerSubmit = () => {
        const {rootPath} = this.state;
        const {history} = this.props;
        setRootDir(rootPath,
            () => {
                this.setState({scanning: true});
            },
            () => {
                this.setState((prSt) => ({scanning: !prSt.scanning}));
                localStorage.setItem('rootPath', rootPath);
                history.push('/');
            },
            () => {
                this.setState((prSt) => ({scanning: !prSt.scanning}));
                this.setState({error: true});
            }
        )
    };

    render() {
        const {rootPath, error, scanning} = this.state;
        return (
            <Row>
                <Form>
                    {error && <Alert color="danger">Проверьте правильность пути</Alert>}
                    <FormGroup>
                        <Label for="rootPath">Введите абсолютный путь к корневой директории</Label>
                        <Input type="text" id="rootPath" value={rootPath} onChange={this.handlerChange}/>
                    </FormGroup>
                    <Button onClick={this.handlerSubmit}>Сохранить</Button>{scanning &&
                <BeatLoader
                    css={override}
                    sizeUnit={'px'}
                    size={10}
                    color={'#6c757d'}
                    loading={this.state.loading}
                />}
                </Form>
            </Row>
        )
    }
}
