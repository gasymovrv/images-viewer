import React from 'react';
import Navigation from "../Navigation/Navigation";
import './style.css'
import {Route} from "react-router-dom";


export default class Directory extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active : props.dir.active
        }
    }

    render() {
        const {dir, onClick, parentIds} = this.props;
        let classes = "nav-link";
        if (dir.active) {
            classes += " active";
        }
        let children = null;
        if (dir.active && dir.children) {
            let updatedParentIds = [...parentIds];
            if(dir.parent && dir.parent.children){
                updatedParentIds = updatedParentIds.filter((sibling)=>dir.parent.children.indexOf(sibling.id) === -1);
            }
            updatedParentIds.push(dir.id);
            children = (
                <li>
                    <Route component={(props)=><Navigation parentIds={updatedParentIds} dirs={dir.children} {...props}/>} />
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
