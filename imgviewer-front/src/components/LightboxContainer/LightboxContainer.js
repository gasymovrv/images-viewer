import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default class LightboxContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewImgIndex: props.viewImgIndex,
        };
    }
    prevImage = () => {
        this.setState((prSt, prPr)=>({
            viewImgIndex: (prSt.viewImgIndex + prPr.images.length - 1) % prPr.images.length
        }))
    };
    nextImage = () => {
        this.setState((prSt, prPr)=>({
            viewImgIndex: (prSt.viewImgIndex + 1) % prPr.images.length
        }))
    };

    render() {
        const {images, hideViewImg} = this.props;
        const {viewImgIndex} = this.state;

        console.log('images=', images);
        console.log('viewImgIndex=', viewImgIndex);
        console.log('images[viewImgIndex]=', images[viewImgIndex]);
        return (
            <Lightbox
                mainSrc={`file:///${images[viewImgIndex].filePath}`}
                nextSrc={`file:///${images[(viewImgIndex + 1) % images.length].filePath}`}
                prevSrc={`file:///${images[(viewImgIndex + images.length - 1) % images.length].filePath}`}
                onCloseRequest={hideViewImg}
                onMovePrevRequest={this.prevImage}
                onMoveNextRequest={this.nextImage}
            />
        );
    }
};