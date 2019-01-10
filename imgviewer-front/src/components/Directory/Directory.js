import React from 'react';
import Navigation from '../Navigation';
import './style.css'
import {Route} from 'react-router-dom';


export default class Directory extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active : props.dir.active
        }
    }

    render() {
        const {dir, onClick} = this.props;
        let classes = "nav-link";
        if (dir.active) {
            classes += " active";
        }
        let children = null;
        if (dir.active && dir.children) {
            children = (
                <li>
                    <Route path={`/dirs/:id(\\d+)`} component={(props)=><Navigation directories={dir.children} {...props}/>} />
                </li>
            )
        }
        return (
            <ul className='directory-list'>
                <li>
                    <a onClick={onClick(dir.id)} className={classes} href="#">{dir.name}</a>
                </li>
                {children}
            </ul>
        )
    }
}
