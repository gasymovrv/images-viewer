import React from 'react';
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Collapse} from 'reactstrap';

export default class Item extends React.Component {
    state = {
        collapseDetails: false
    };

    toggleDetails = ()=>{
        this.setState({ collapseDetails: !this.state.collapseDetails });
    };

    render() {
        const {file, zoom, openViewImg} = this.props;
        let content;
        let href = `file:///${file.filePath}`;
        let date = null;
        let fileSize = 0;
        if(file.fileSize && file.fileSize>0){
            if(file.fileSize < 1000000)
                fileSize = (file.fileSize/1000).toFixed(0) + ' Kb';
            else if(file.fileSize < 1000000000)
                fileSize = (file.fileSize/1000000).toFixed(2) + ' Mb';
            else if(file.fileSize < 1000000000000)
                fileSize = (file.fileSize/1000000000).toFixed(2) + ' Gb';
        }

        if (file.lastModified) {
            const lastModified = new Date(Date.parse(file.lastModified));
            date = <p>{customFormatDate(lastModified)}</p>
        }
        if (file.isVideo) {
            content = (
                <video className="img-fluid image scale-on-hover" controls>
                    <source src={href}/>
                    Тег video не поддерживается этим браузером.
                </video>
            );
        } else {
            content = (
                <a href={href} onClick={openViewImg}>
                    <img className="img-fluid image scale-on-hover" src={href}/>
                </a>
            )
        }
        return (
            <Col lg={zoom} className="item">
                <div className="lightbox">
                    {content}
                    <Button color="primary" onClick={this.toggleDetails}
                            style={{margin: '1rem'}}>Подробнее</Button>
                    <Collapse isOpen={this.state.collapseDetails}>
                        <Card>
                            <CardBody>
                                <CardTitle>{file.name}</CardTitle>
                                <CardSubtitle>Размер: {fileSize}</CardSubtitle>
                                <CardSubtitle>Ссылка для скачивания:</CardSubtitle>
                                <CardText><a href={href}>{href.replace('file:///', '')}</a></CardText>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
                {date}
            </Col>
        )
    }
};

function customFormatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(month<10){
        month = '0'+month;
    }
    if(day<10){
        day = '0'+day;
    }
    if(hours<10){
        hours = '0'+hours;
    }
    if(minutes<10){
        minutes = '0'+minutes;
    }
    return `${year}.${month}.${day} ${hours}:${minutes}`
}

function standartFormatDate(date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleString("ru", options);
}
