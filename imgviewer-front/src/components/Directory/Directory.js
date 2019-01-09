import React from 'react';
import Navigation from "../Navigation/Navigation";
import './style.css'


export default class Directory extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active : props.dir.active
        }
    }

    render() {
        const {dir, onClick, history} = this.props;
        const {active, id, name} = dir;
        let classes = "nav-link";
        if (active) {
            classes += " active";
        }
        let children = null;
        if (active && dir.children) {
            children = (
                <li>
                    <Navigation parent={dir} dirs={dir.children} history={history}/>
                </li>
            )
        }
        return (
            <ul className='directory-list'>
                <li>
                    <a onClick={onClick(id)} className={classes} href="#">{name}</a>
                </li>
                {children}
            </ul>
        )
    }
}
