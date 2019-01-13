import React, {Fragment} from 'react';
import {Badge, Button, Col, Container, Row} from 'reactstrap';
import {findAllFilesByDirectoryId} from '../../api/filesApi';
import Item from '../Item';
import LightboxContainer from '../LightboxContainer';

/**
 * Компонент для отображения галлереи
 * Испольовать только через роутинг с передачей параметра id (id директории), например так:
 * <Route path={`/dirs/:id`} component={ViewerBox}/>
 */
export default class ViewerBox extends React.Component {
    constructor(props){
        super(props);
        const {match} = props;
        let dirId = null;
        if (match && match.params && match.params.id) {
            dirId = parseInt(match.params.id);
        }
        this.state = {
            dirId: dirId,
            zoom: 4,
            files:[],
            isOpenViewImg: false,
            viewImgIndex: 0
        };
    }

    handleZoomPlus = () => {
        this.setState((prSt)=>{
            let resultZoom = prSt.zoom+1;
            if(resultZoom>12){
                resultZoom--;
            }
            return {zoom: resultZoom}
        });
    };

    handleZoomMinus = () => {
        this.setState((prSt)=>{
            let resultZoom = prSt.zoom-1;
            if(resultZoom<4){
                resultZoom++;
            }
            return {zoom: resultZoom}
        });
    };

    componentDidMount(){
        const {dirId} = this.state;
        this.loadFiles(dirId);
    }

    componentDidUpdate(prevProps, prevState){
        const {match} = this.props;
        const newDirId = parseInt(match.params.id);
        if (match && match.params && match.params.id && newDirId !== prevState.dirId) {
            this.setState({
                dirId: newDirId
            });
            this.loadFiles(newDirId);
        }
    }

    loadFiles = (dirId) => {
        findAllFilesByDirectoryId(
            (entities) => {
                this.setState({
                    files: [...entities]
                })
            },
            dirId)
    };

    openViewImg=(i)=>(e)=>{
        e.preventDefault();
        this.setState({
            isOpenViewImg: true,
            viewImgIndex: i
        })
    };

    hideViewImg=()=>{
        this.setState({
            isOpenViewImg: false,
            viewImgIndex: 0
        })
    };

    render() {
        const {files, zoom, isOpenViewImg, viewImgIndex} = this.state;
        const imgsOrVideos = files.map((file, i)=>{
            return <Item key={file.id} index={i} file={file} zoom={zoom} openViewImg={this.openViewImg(i)}/>
        });
        return (
            <Fragment>
                <Row>
                    <div className="fixed-zoom">
                        <p>
                            <Button color="primary" onClick={this.handleZoomPlus}>+</Button>{' '}
                            <Button color="primary" onClick={this.handleZoomMinus}>-</Button>
                        </p>
                    </div>
                </Row>
                <Row>
                    <section className="gallery-block grid-gallery">
                        <Container>
                            <Row style={{marginBottom: 'calc(2vh)'}}>
                                <Col xs="12">
                                    <h5 style={{display:'inline'}}>Всего объектов: <Badge color="secondary">{files.length}</Badge></h5>
                                </Col>
                            </Row>
                            <Row>
                                {imgsOrVideos}
                            </Row>
                        </Container>
                    </section>
                </Row>
                {isOpenViewImg && <LightboxContainer viewImgIndex={viewImgIndex} images={files} hideViewImg={this.hideViewImg}/>}
            </Fragment>
        )
    }
}
