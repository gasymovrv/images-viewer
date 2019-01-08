package ru.gas.imgviewerrest.utils;

import ru.gas.imgviewerrest.entities.Directory;

public class DirectoryIterator {
    private Directory root;

    public DirectoryIterator(Directory root) {
        this.root = root;
    }

    public Directory getDirByPath(String path){
        return getDirByPath(path, root);
    }

    private Directory getDirByPath(String path, Directory root){
        Directory result = null;
        if(root.equalsToPath(path)){
            result = root;
        } else {
            for (Directory d : root.getChildren()) {
                result = getDirByPath(path, d);
                if(result!=null){
                    break;
                }
            }
        }
        return result;
    }
}
