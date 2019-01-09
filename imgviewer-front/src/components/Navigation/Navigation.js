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
        const {location} = this.props;
        if (directories === null) {
            findRootDir((dir) => {
                const updatedDir = {...dir};
                //Это условие для восстановления открытых директорий после перезагрузки страницы
                if (location && location.search) {
                    const params = new URLSearchParams(location.search.substring(1));
                    const ids = [];
                    for(let value of params.values()) {
                       ids.push(parseInt(value));
                    }
                    if(ids && ids.length>0){
                        if(ids.indexOf(updatedDir.id) > -1){
                            updatedDir.active = true;
                        }
                        recursiveChildrenHandler(updatedDir, (child) => {
                            if (ids.indexOf(child.id) > -1) {
                                child.active = true;
                            }
                        });
                    } else{
                        console.log('ids - не массив или не найдено!')
                    }
                }
                //Заполняем родителей начиная с root
                recursiveFillParent(updatedDir);
                console.log(updatedDir);
                this.setState({directories: [updatedDir]});
            })
        }
    }

    clickHandler = (id) => (event) => {
        event.preventDefault();
        const {history, parentIds} = this.props;
        let updatedDirectories = [...this.state.directories];
        let locationObj = {
            pathname: `/dirs/${id}`
        };
        updatedDirectories.forEach((dir)=>{
            if(dir.id === id){
                dir.active = !dir.active;
                //Если закрыли директорию
                if(!dir.active){
                    if(dir.parent){
                        locationObj.pathname = `/dirs/${dir.parent.id}`;
                    }
                    recursiveChildrenHandler(dir, (child)=>{child.active=false});
                }
                //Если открыли директорию
                else {
                    //Создаем список параметров с id текущей папки и всех ее родителей (понадобится при перезагрузке страницы)
                    let ids = [dir.id];
                    if(parentIds && parentIds.length > 0){
                        ids.push(...parentIds);
                    }
                    console.log(ids);
                    ids = ids.reduce((result, id, index)=> {
                        if (index !== ids.length - 1) {
                            result += `ids=${id}&`;
                        } else if (index === ids.length - 1) {
                            result += `ids=${id}`;
                        }
                        return result;
                    }, '?');
                    locationObj.search = ids;
                }
            } else {
                dir.active = false;
            }
        });
        this.setState({directories : updatedDirectories});
        history.replace(locationObj);
    };

    render() {
        const {directories} = this.state;
        const {parentIds} = this.props;

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
                return <Directory onClick={this.clickHandler} key={dir.id} dir={dir} parentIds={parentIds || []} {...this.props}/>
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

function recursiveChildrenHandler(dir, fn) {
    if(dir.children && dir.children.length > 0){
        dir.children.forEach((child)=>{
            fn(child);
            recursiveChildrenHandler(child, fn);
        })
    }
}

function recursiveFillParent(dir) {
    if(dir.children && dir.children.length > 0){
        dir.children.forEach((child)=>{
            child.parent = dir;
            recursiveFillParent(child);
        })
    }
}
