import React from 'react';
import Directory from "../Directory";
import {findRootDir} from "../../api/directoriesApi";


export default class Navigation extends React.Component {
    constructor(props){
        super(props);
        let dirs = null;
        if(props.dirs){
            dirs = [...props.dirs];
        }
        this.state = {
            directories: dirs
        }
    }

    componentDidMount(){
        const {directories} = this.state;
        if (directories === null) {
            findRootDir((dir) => {
                this.setState({directories: [{...dir}]});
            })
        }
    }

    clickHandler = (id) => (event) => {
        event.preventDefault();
        const {history, parent} = this.props;
        let updatedDirectories = [...this.state.directories];
        updatedDirectories.forEach((dir)=>{
            if(dir.id === id){
                dir.active = !dir.active;
                let path =`/dirs/${id}`;
                if(dir.active){
                    history.replace(path);
                } else {
                    if(parent){
                        path = `/dirs/${parent.id}`;
                    }
                    this.recursiveDirectoryHandler(dir, (child)=>{child.active=false});
                    history.replace(path);
                }
            } else {
                dir.active = false;
            }
        });
        this.setState({directories : updatedDirectories})

    };

    recursiveDirectoryHandler = (dir, fn) => {
        if(dir.children && dir.children.length > 0){
            dir.children.forEach((child)=>{
                fn(child);
                this.recursiveDirectoryHandler(child, fn);
            })
        }
    };

    render() {
        const {directories} = this.state;
        let directoriesList = null;
        if(directories) {
            const sortedDirs = [...directories];
            sortedDirs.sort((a, b)=> {
                if(a.name <= b.name){
                    return -1;
                } else {
                    return 1;
                }
            });
            directoriesList = sortedDirs.map((dir) => {
                return <Directory onClick={this.clickHandler} key={dir.id} dir={dir} {...this.props}/>
            });
        }
        return (
            <div className="nav flex-column nav-pills"
                 aria-orientation="vertical">
                {directoriesList}
            </div>
        )
    }
}
