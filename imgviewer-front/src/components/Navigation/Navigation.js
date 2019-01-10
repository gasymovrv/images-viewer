import React from 'react';
import Directory from '../Directory';
import {findRootDir} from '../../api/directoriesApi';
import {recursiveChildrenHandler, recursiveFillParent, recursiveParentsHandler} from '../../helpers/recursive';


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

    componentDidUpdate(prevProps, prevState){
        //Здесь сновная обработка событий клика по директориям, а также обработка при прямом изменении урла
        const {match} = this.props;
        if (match && match.params && match.params.id && parseInt(match.params.id) !== prevState.dirId) {
            let dirId = parseInt(match.params.id);
            let updatedDirectories = [...this.state.directories];
            let currentDir;
            updatedDirectories.forEach((dir)=>{
                dir.active = false;
                recursiveChildrenHandler(dir, (child) => {
                    child.active = false;
                    if (child.id === dirId) {
                        currentDir = child;
                    }
                });
                if (dir.id === dirId){
                    currentDir = dir;
                }
            });
            currentDir.active = true;
            recursiveParentsHandler(currentDir, (parent) => {
                parent.active = true;
            });
            this.setState({
                dirId: dirId,
                directories : updatedDirectories
            });
        }
    }

    clickHandler = (id) => (event) => {
        //Здесь происходит только переход по ссылкам, основная обработка событий уже в componentDidUpdate
        event.preventDefault();
        const {history} = this.props;
        const {directories} = this.state;
        let path = `/dirs/${id}`;
        directories.forEach((dir) => {
            if (dir.id === id && dir.active) {
                //Если закрыли директорию - изменяем id в url на родительский
                if (dir.parent) {
                    path = `/dirs/${dir.parent.id}`;
                } else {
                    path = `/`;
                }
            }
        });
        history.push(path);
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
