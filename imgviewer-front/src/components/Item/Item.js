import React from 'react';
import {Col} from "reactstrap";

export default function Item({file}) {
    let content;
    if (file.isVideo) {
        content = <video className="img-fluid image scale-on-hover" src={`file:///${file.filePath}`} controls>Видео не загрузилось</video>
    } else {
        content = <img className="img-fluid image scale-on-hover" src={`file:///${file.filePath}`} />;
    }
   return (
       <Col md="6" lg="4" className="item">
           <a className="lightbox" href={`file:///${file.filePath}`}>
               {content}
           </a>
       </Col>
   )
}
