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
        let dirId = null;
        if (props.match && props.match.params && props.match.params.id) {
            dirId = props.match.params.id;
        }
        this.state = {
            dirId: dirId,
            directories: dirs
        }
    }

    componentDidMount(){
        const {directories, dirId} = this.state;
        const {location} = this.props;
        if (directories === null) {
            findRootDir((dir) => {
                const updatedDir = {...dir};
                //Это условие для восстановления открытых директорий после перезагрузки страницы
                if (location && location.search) {
                    const params = new URLSearchParams(location.search.substring(1));
                    const ids = [];
                    if(dirId){
                        ids.push(parseInt(dirId));
                    }
                    for(let value of params.values()) {
                       ids.push(parseInt(value));
                    }
                    console.log(ids);
                    if(ids && ids.length>0){
                        if(ids.indexOf(updatedDir.id) > -1){
                            updatedDir.active = true;
                        }
                        recursiveChildrenHandler(updatedDir, (child) => {
                            if (ids.indexOf(child.id) > -1) {
                                child.active = true;
                            }
                        });
                    }
                }
                //Заполняем родителей начиная с root
                recursiveFillParent(updatedDir);
                this.setState({directories: [updatedDir]});
            })
        }
    }

    // componentDidUpdate(prevProps, prevState){
    //     const {dirId} = this.state;
    //     const {match, location} = this.props;
    //     if (match && match.params && match.params.id && match.params.id !== prevState.dirId) {
    //         findRootDir((dir) => {
    //             const updatedDir = {...dir};
    //             //Это условие для восстановления открытых директорий после перезагрузки страницы
    //             if (location && location.search) {
    //                 const params = new URLSearchParams(location.search.substring(1));
    //                 const ids = [];
    //                 if(dirId){
    //                     ids.push(parseInt(dirId));
    //                 }
    //                 for(let value of params.values()) {
    //                     ids.push(parseInt(value));
    //                 }
    //                 console.log(ids);
    //                 if(ids && ids.length>0){
    //                     if(ids.indexOf(updatedDir.id) > -1){
    //                         updatedDir.active = true;
    //                     }
    //                     recursiveChildrenHandler(updatedDir, (child) => {
    //                         if (ids.indexOf(child.id) > -1) {
    //                             child.active = true;
    //                         }
    //                     });
    //                 }
    //             }
    //             //Заполняем родителей начиная с root
    //             recursiveFillParent(updatedDir);
    //             this.setState({
    //                 dirId: match.params.id,
    //                 directories: [updatedDir]
    //             });
    //         })
    //     }
    //
    // }

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
                //Если закрыли директорию - изменяем id в url на родительский
                if(!dir.active){
                    if(dir.parent){
                        locationObj.pathname = `/dirs/${dir.parent.id}`;
                    }
                    recursiveChildrenHandler(dir, (child)=>{child.active=false});
                }
                //Создаем список параметров с id всех родительских директорий (понадобится при перезагрузке страницы)
                locationObj.search = getParamsString(parentIds, 'parent');
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

function getParamsString(idsArray, name) {
    let ids = [];
    if(idsArray && idsArray.length > 0){
        ids.push(...idsArray);
    }
    return ids.reduce((result, id, index)=> {
        if (index !== ids.length - 1) {
            result += `${name}=${id}&`;
        } else if (index === ids.length - 1) {
            result += `${name}=${id}`;
        }
        return result;
    }, '?');
}
