import React from 'react';
import Directory from "../Directory";
import {findRootDir} from "../../api/directoriesApi";


export default class Navigation extends React.Component {
    constructor(props){
        super(props);
        let directories = null;
        if(props.directories){
            directories = [...props.directories];
        }
        let dirId = null;
        if (props.match && props.match.params && props.match.params.id) {
            dirId = parseInt(props.match.params.id);
        }
        this.state = {
            dirId: dirId, //id директории, полученный из url
            directories: directories
        }
    }

    componentDidMount(){
        const {directories, dirId} = this.state;
        //Если directories === null значит это первое открытие страницы или перезагрузка
        if (directories === null) {
            findRootDir((dir) => {
                const rootDir = {...dir};
                //Заполняем родителей начиная с root
                recursiveFillParent(rootDir);
                //Если в url был id, то открываем эту директорию и все ее родительские директории
                if (dirId && dirId !== rootDir.id) {
                    let currentDir;
                    recursiveChildrenHandler(rootDir, (child) => {
                        if (dirId === child.id) {
                            currentDir = child;
                        }
                    });
                    if (!currentDir) {
                        throw Error(`Директория с id=${dirId} не найдена`)
                    }
                    currentDir.active = true;
                    recursiveParentsHandler(currentDir, (parent) => {
                        parent.active = true;
                    })
                } else if(dirId && dirId === rootDir.id) {
                    rootDir.active = true;
                }
                this.setState({directories: [rootDir]});
            })
        }
    }

    // componentDidUpdate(prevProps, prevState){
    //     const {match} = this.props;
    //     const {directories} = this.state;
    //
    //     if (match && match.params && match.params.id && match.params.id !== prevState.dirId) {
    //         let dirId = match.params.id;
    //         let rootDir;
    //         if(directories){
    //             rootDir = directories[0].parent;
    //         }
    //         let currentDir;
    //         recursiveChildrenHandler(rootDir, (child) => {
    //             if (dirId === child.id) {
    //                 currentDir = child;
    //             } else {
    //                 child.active = false;
    //             }
    //         });
    //         if (!currentDir) {
    //             throw Error(`Директория с id=${dirId} не найдена`)
    //         }
    //         currentDir.active = true;
    //         recursiveParentsHandler(currentDir, (parent) => {
    //             parent.active = true;
    //         });
    //         this.setState({directories: [rootDir]});
    //     }
    // }

    clickHandler = (id) => (event) => {
        event.preventDefault();
        const {history} = this.props;
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
                    } else {
                        locationObj.pathname = `/`;
                    }
                    recursiveChildrenHandler(dir, (child)=>{child.active=false});
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

function recursiveChildrenHandler(dir, fn) {
    if(dir.children && dir.children.length > 0){
        dir.children.forEach((child)=>{
            fn(child);
            recursiveChildrenHandler(child, fn);
        })
    }
}

function recursiveParentsHandler(child, fn) {
    if(child.parent){
        fn(child.parent);
        recursiveParentsHandler(child.parent, fn);
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
