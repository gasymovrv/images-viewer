import React, {Fragment} from 'react';
import Navigation from "../Navigation/Navigation";


export default class Directory extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            active : props.dir.active
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(!prevState.active && nextProps.dir.active){
            //todo Тут косяк приводит к циклическому обновлению
            //Возможно надо переделать на роутинг
            nextProps.setActiveDir(nextProps.dir);
            console.log(nextProps.dir.name);
        }
        return null;
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
                    onClick={onClick(id)}
                    className={classes}>
                    {name}
                </li>
                {children}
            </ul>
        )
    }
}
