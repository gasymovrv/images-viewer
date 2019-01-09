export function recursiveChildrenHandler(dir, fn) {
    if(dir.children && dir.children.length > 0){
        dir.children.forEach((child)=>{
            fn(child);
            recursiveChildrenHandler(child, fn);
        })
    }
}

export function recursiveParentsHandler(child, fn) {
    if(child.parent){
        fn(child.parent);
        recursiveParentsHandler(child.parent, fn);
    }
}

export function recursiveFillParent(dir) {
    if(dir.children && dir.children.length > 0){
        dir.children.forEach((child)=>{
            child.parent = dir;
            recursiveFillParent(child);
        })
    }
}