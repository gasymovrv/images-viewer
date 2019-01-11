import React, {Fragment} from 'react';
import {findFilesByDirectoryId} from "../../api/filesApi";
import {Badge, Button, Col, Container, Row} from 'reactstrap';
import Item from '../Item';

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
            loadAppend: false,
            fullLoad: false,
            zoom: 4,
            files:[],
            activePage: 1,
            itemsCountPerPage: 10,
            totalItemsCount: 0
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

    handleScroll = () => {
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        console.log(scrollHeight);
        //Когда прокрутили до самого низа (-50 - чтобы сработало не совсем внизу)
        if (window.pageYOffset >= (scrollHeight - document.documentElement.clientHeight) - 50 && !this.state.loadAppend && !this.state.fullLoad) {
            this.setState((prevState) => ({
                activePage: prevState.activePage + 1,
                loadAppend: true
            }));
        }
    };

    componentDidMount(){
        const {activePage, itemsCountPerPage} = this.state;
        this.loadFiles(activePage, itemsCountPerPage);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState){
        const {match} = this.props;
        const {loadAppend, activePage, itemsCountPerPage} = this.state;
        if (match && match.params && match.params.id && parseInt(match.params.id) !== prevState.dirId) {
            this.setState({
                dirId: parseInt(match.params.id),
                activePage: 1
            });
            this.loadFiles(activePage, itemsCountPerPage)
        } else if(loadAppend && !prevState.loadAppend && activePage !== prevState.activePage){
            this.loadFilesWithAppend(activePage, itemsCountPerPage)
        }
    }

    loadFilesWithAppend = (activePage, itemsCountPerPage) => {
        const {dirId} = this.state;
        findFilesByDirectoryId(
            (entities, totalElements) => {
                this.setState((prevState) => {
                    if (entities && entities.length>0) {
                        return {
                            files: [...prevState.files, ...entities],
                            totalItemsCount: totalElements,
                            loadAppend: false,
                            fullLoad: false
                        }
                    } else {
                        return {
                            activePage: activePage-1,
                            loadAppend: false,
                            fullLoad: true
                        }
                    }
                })
            },
            dirId,
            activePage,
            itemsCountPerPage)
    };

    loadFiles = (activePage, itemsCountPerPage) => {
        const {dirId} = this.state;
        findFilesByDirectoryId(
            (entities, totalElements) => {
                this.setState({
                    files: [...entities],
                    totalItemsCount: totalElements,
                    loadAppend: false,
                    fullLoad: entities.length === 0
                })
            },
            dirId,
            activePage,
            itemsCountPerPage)
    };

    render() {
        const {files, totalItemsCount, zoom} = this.state;
        const imgsOrVideos = files.map((file)=>{
            return <Item key={file.id} file={file} zoom={zoom}/>
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
                                    <h5 style={{display:'inline'}}>Всего объектов: <Badge color="secondary">{totalItemsCount}</Badge></h5>
                                    <h5 style={{display:'inline'}}> Показано объектов: <Badge color="secondary">{files.length}</Badge></h5>
                                </Col>
                            </Row>
                            <Row>
                                {imgsOrVideos}
                            </Row>
                        </Container>
                    </section>
                </Row>
            </Fragment>
        )
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
}
