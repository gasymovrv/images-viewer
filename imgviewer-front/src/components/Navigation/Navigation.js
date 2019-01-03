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
        let updatedDirectories = [...this.state.directories];
        updatedDirectories.forEach((dir)=>{
            if(dir.id === id){
                dir.active = !dir.active;
            } else {
                dir.active = false;
            }
        });
        this.setState({directories : updatedDirectories})

    };

    render() {
        const {directories} = this.state;
        const {setActiveDir} = this.props;
        let directoriesList = null;
        if(directories) {
            directoriesList = directories.map((dir) => {
                return <Directory onClick={this.clickHandler} key={dir.id} dir={dir} setActiveDir={setActiveDir}/>
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
