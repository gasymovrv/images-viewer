import React, {Fragment} from 'react';
import Pagination from 'react-js-pagination';
import {findFilesWithPaging} from "../../api/filesApi";

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
        findFilesWithPaging(
            (entities, totalElements) => {
                this.setState({files: [...entities], totalItemsCount: totalElements})
            },
            activePage,
            itemsCountPerPage)
    };

    render() {
        const {files, activePage, itemsCountPerPage, totalItemsCount} = this.state;
        const imgsOrVideos = files.map((file)=>{
            if (file.isVideo) {
                return <video key={file.id} src={`file:///${file.filePath}`} width='500px' controls>Видео не загрузилось</video>
            } else {
                return <img key={file.id} src={`file:///${file.filePath}`} width='400px'/>;
            }
        });
        return (
            <Fragment>
                {imgsOrVideos}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </Fragment>
        )
    }
}
