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
        console.log('clickHandler');
        let updatedDirectories = [...this.state.directories];
        updatedDirectories.forEach((dir)=>{
            if(dir.id === id){
                dir.active = !dir.active;
                console.log('clickHandler, dir.active, id',dir.active, dir.id);
            } else {
                dir.active = false;
            }
        });
        this.setState({directories : updatedDirectories})

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
