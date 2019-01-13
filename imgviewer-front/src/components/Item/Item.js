import React from 'react';
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Collapse} from 'reactstrap';
import {FadeLoader} from 'react-spinners';


export default class Item extends React.Component {
    state = {
        collapseDetails: false,
        isScreenVisible: false,
        loading: false
    };

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        const isInViewport = this.isInViewport();
        this.setState({
            isScreenVisible: isInViewport,
            loading: isInViewport
        })
    }

    handleScroll = () => {
        if (!this.state.isScreenVisible) {
            const position = window.pageYOffset;
            setTimeout(() => {
                if (position === window.pageYOffset) {
                    const isInViewport = this.isInViewport(window.pageYOffset);
                    this.setState({
                        isScreenVisible: isInViewport,
                        loading: isInViewport
                    });
                }
            }, 500);
        }
    };

    handleImageLoaded = () => {
        this.setState({ loading: false });
    };

    isInViewport = (offset = 0) => {
        if (!this.thisItem) return false;
        const top = this.thisItem.getBoundingClientRect().top;
        //top - отступ элемента от верха окна (бывает отрицательным если прокрутили ниже этого элемента)
        //offset = pageYOffset - текущее положение прокрутки (до верхней точки окна)
        //document.documentElement.clientHeight - высота окна
        return top+offset >= offset && top+offset <= offset+document.documentElement.clientHeight;
    };

    refHandle = (node) => {
        this.thisItem = node;
    };

    toggleDetails = () => {
        this.setState({collapseDetails: !this.state.collapseDetails});
    };

    render() {
        const {file, zoom, openViewImg} = this.props;
        const {isScreenVisible, loading} = this.state;
        let content;
        let hrefIsVisible = isScreenVisible ? `file:///${file.filePath}` : '';
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
                <video src={hrefIsVisible} className="img-fluid image scale-on-hover" controls>
                    Тег video не поддерживается этим браузером.
                </video>
            );
        } else {
            content = (
                <a href='#' onClick={openViewImg}>
                    <img className="img-fluid image scale-on-hover"
                         src={hrefIsVisible}
                         onLoad={this.handleImageLoaded}
                    />
                    {!isScreenVisible&&<div>Изображение</div>}
                    <FadeLoader
                        sizeUnit={'px'}
                        size={10}
                        color={'#007bff'}
                        loading={loading}/>
                </a>
            )
        }
        return (
            <Col lg={zoom} className="item">
                <div className="lightbox" ref={this.refHandle}>
                    {content}
                    <Button color="secondary"
                            onClick={this.toggleDetails}
                            style={{margin: '1rem'}}>
                        Подробнее
                    </Button>
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

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
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
