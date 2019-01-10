import React, {Fragment} from 'react';
import Pagination from 'react-js-pagination';
import {findFilesByDirectoryId} from "../../api/filesApi";
import {Button, Container, Row} from 'reactstrap';
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
            zoom: 4,
            files:[],
            activePage: 1,
            itemsCountPerPage: 10,
            totalItemsCount: 0
        };
    }

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
        this.loadFilesWithPaging(pageNumber, this.state.itemsCountPerPage);
    };

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
            if(resultZoom<1){
                resultZoom++;
            }
            return {zoom: resultZoom}
        });
    };

    componentDidMount(){
        const {activePage, itemsCountPerPage} = this.state;
        this.loadFilesWithPaging(activePage, itemsCountPerPage)
    }

    componentDidUpdate(prevProps, prevState){
        const {match} = this.props;
        if (match && match.params && match.params.id && parseInt(match.params.id) !== prevState.dirId) {
            const {activePage, itemsCountPerPage} = this.state;
            this.setState({
                dirId: parseInt(match.params.id),
                activePage: 1
            });
            this.loadFilesWithPaging(activePage, itemsCountPerPage)
        }
    }

    loadFilesWithPaging = (activePage, itemsCountPerPage) => {
        const {match} = this.props;
        findFilesByDirectoryId(
            (entities, totalElements) => {
                this.setState({files: [...entities], totalItemsCount: totalElements})
            },
            match.params.id,
            activePage,
            itemsCountPerPage)
    };

    render() {
        const {files, activePage, itemsCountPerPage, totalItemsCount, zoom} = this.state;
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
                            <Row>
                                {imgsOrVideos}
                            </Row>
                        </Container>
                    </section>
                </Row>
                <Row>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        aria-label="Page navigation example"
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </Row>
            </Fragment>
        )
    }
}
