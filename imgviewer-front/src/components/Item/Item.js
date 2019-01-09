import React, {Fragment} from 'react';
import {Col} from "reactstrap";

export default function Item({file, zoom}) {
    let content;
    let date = null;
    if(file.lastModified){
        const lastModified = new Date(Date.parse(file.lastModified));
        date = <p>{customFormatDate(lastModified)}</p>
    }
    if (file.isVideo) {
        content = <video className="img-fluid image scale-on-hover" src={`file:///${file.filePath}`} controls>Видео не загрузилось</video>
    } else {
        content = <img className="img-fluid image scale-on-hover" src={`file:///${file.filePath}`}/>
    }
    return (
        <Col lg={zoom} className="item">
            <a className="lightbox" href={`file:///${file.filePath}`}>
                {content}
            </a>
            {date}
        </Col>
    )
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
