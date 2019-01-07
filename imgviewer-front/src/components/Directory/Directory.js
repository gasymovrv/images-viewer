import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from "../Navigation/Navigation";


export default class Directory extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active : props.dir.active
        }
    }

    render() {
        const {dir, onClick} = this.props;
        const {active, id, name} = dir;
        let classes = "nav-link";
        if (active) {
            classes += " active";
        }
        let children = null;
        if (active && dir.children) {
            console.log(dir.children);
            children = <Navigation dirs={dir.children}/>
        }
        return (
            <ul>
                <li
                    className={classes}>
                    <Link onClick={onClick(id)} to={`/dirs/${id}`}>{name}</Link>
                </li>
                {children}
            </ul>
        )
    }
}
