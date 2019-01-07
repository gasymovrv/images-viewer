import React, {Fragment} from 'react';
import Pagination from 'react-js-pagination';
import {findFilesByDirectoryId, findFilesWithPaging} from "../../api/filesApi";
import {Container, Row} from "reactstrap";
import Item from "../Item";

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
            this.setState({dirId: match.params.id});
            this.loadFilesWithPaging(activePage, itemsCountPerPage)
        }
        console.log('componentDidUpdate');
    }

    loadFilesWithPaging = (activePage, itemsCountPerPage) => {
        const {match} = this.props;
        console.log("From link, id: ", match.params.id);
        findFilesByDirectoryId((files) => {
            console.log(files);
            this.setState({files: [...files]});
        }, match.params.id)
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
