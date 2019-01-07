import React, {Fragment} from 'react';
import Pagination from 'react-js-pagination';
import {findFilesByDirectoryId, findFilesWithPaging} from "../../api/filesApi";
import {Container, Row} from "reactstrap";
import Item from "../Item";

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
            dirId = match.params.id;
        }
        this.state = {
            dirId: dirId,
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

    componentDidMount(){
        console.log('viewerbox');
        const {activePage, itemsCountPerPage} = this.state;
        this.loadFilesWithPaging(activePage, itemsCountPerPage)
    }

    componentDidUpdate(prevProps, prevState){
        const {match} = this.props;
        if (match && match.params && match.params.id && match.params.id !== prevState.dirId) {
            const {activePage, itemsCountPerPage} = this.state;
            this.setState({
                dirId: match.params.id,
                activePage: 1
            });
            this.loadFilesWithPaging(activePage, itemsCountPerPage)
        }
        console.log('componentDidUpdate');
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
        const {files, activePage, itemsCountPerPage, totalItemsCount} = this.state;
        const imgsOrVideos = files.map((file)=>{
            return <Item key={file.id} file={file}/>
        });
        return (
            <Fragment>
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
