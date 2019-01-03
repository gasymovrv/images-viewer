import React, {Fragment} from 'react';
import Pagination from 'react-js-pagination';
import {findFilesByDirectoryId, findFilesWithPaging} from "../../api/filesApi";
import {Container, Row} from "reactstrap";
import Item from "../Item";

export default class ViewerBox extends React.Component {
    state = {
        files:[],
        activePage: 1,
        itemsCountPerPage: 10,
        totalItemsCount: 0
    };

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
        this.loadFilesWithPaging(pageNumber, this.state.itemsCountPerPage);
    };

    componentDidMount(){
        const {activePage, itemsCountPerPage} = this.state;
        this.loadFilesWithPaging(activePage, itemsCountPerPage)
    }

    loadFilesWithPaging = (activePage, itemsCountPerPage)=>{
        const {dir} = this.props;
        if (dir) {
            findFilesByDirectoryId((files) => {
                this.setState({files: [...files]});
            }, dir.id)
        } else {
            findFilesWithPaging(
                (entities, totalElements) => {
                    this.setState({files: [...entities], totalItemsCount: totalElements})
                },
                activePage,
                itemsCountPerPage
                )
        }
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
                    {/*<Pagination*/}
                        {/*itemClass="page-item"*/}
                        {/*linkClass="page-link"*/}
                        {/*aria-label="Page navigation example"*/}
                        {/*activePage={activePage}*/}
                        {/*itemsCountPerPage={itemsCountPerPage}*/}
                        {/*totalItemsCount={totalItemsCount}*/}
                        {/*pageRangeDisplayed={5}*/}
                        {/*onChange={this.handlePageChange}*/}
                    {/*/>*/}
                </Row>
            </Fragment>
        )
    }
}
