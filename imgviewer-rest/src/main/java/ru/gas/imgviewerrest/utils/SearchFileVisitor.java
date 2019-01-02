package ru.gas.imgviewerrest.utils;

import lombok.extern.slf4j.Slf4j;
import ru.gas.imgviewerrest.entities.Directory;
import ru.gas.imgviewerrest.entities.FileObject;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;


/**
* Класс для прохождения по дереву файлов
**/
@Slf4j
public class SearchFileVisitor extends SimpleFileVisitor<Path> {
    private Directory rootDirectory;

    public SearchFileVisitor(Directory rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        String ext = file.toString().replaceAll("^.*\\.", "");
        switch (ext) {
            case "jpg":
            case "png":
            case "bmp":
            case "gif":
            case "mov":
            case "wmv":
            case "mkv":
            case "avi":
            case "flv":
            case "mpeg":
            case "mpg":
            case "3gp":
                setChildrenFiles(rootDirectory, file, attrs);
        }
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        setChildrenDirectories(rootDirectory, dir, attrs);
        return FileVisitResult.CONTINUE;
    }

    private void setChildrenDirectories(Directory rootDirectory, Path pathDir, BasicFileAttributes attrs){
        Directory resultDirectory;
        File dir = pathDir.toFile();
        File parentDir = pathDir.getParent().toFile();
        if (parentDir.getAbsolutePath().equals(rootDirectory.getDirectoryPath())){
            resultDirectory = new Directory();
            resultDirectory.fillFromFile(dir);
            resultDirectory.setParent(rootDirectory);
            rootDirectory.getChildren().add(resultDirectory);
        } else {
            for (Directory d : rootDirectory.getChildren()) {
                if(parentDir.getAbsolutePath().equals(d.getDirectoryPath())){
                    setChildrenDirectories(d, pathDir, attrs);
                }
            }
        }
    }

    private void setChildrenFiles(Directory rootDirectory, Path pathFile, BasicFileAttributes attrs){
        FileObject resultFileObject;
        File file = pathFile.toFile();
        File parentDir = pathFile.getParent().toFile();
        if (parentDir.getAbsolutePath().equals(rootDirectory.getDirectoryPath())){
            resultFileObject = new FileObject();
            resultFileObject.fillFromFile(file);
            resultFileObject.setFileSize(attrs.size());
            resultFileObject.setDirectory(rootDirectory);
            String ext = file.getName().replaceAll("^.*\\.", "");
            switch (ext) {
                case "mov":
                case "mpg":
                case "3gp":
                case "wmv":
                case "mkv":
                case "avi":
                case "flv":
                case "mpeg":
                    resultFileObject.setIsVideo(true);
            }
            resultFileObject.setExt(ext);
            rootDirectory.getFiles().add(resultFileObject);
        } else {
            for (Directory d : rootDirectory.getChildren()) {
                if(parentDir.getAbsolutePath().equals(d.getDirectoryPath())){
                    setChildrenFiles(d, pathFile, attrs);
                }
            }
        }
    }
}
