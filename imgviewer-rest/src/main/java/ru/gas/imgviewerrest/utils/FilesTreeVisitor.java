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
public class FilesTreeVisitor extends SimpleFileVisitor<Path> {
    private Directory rootDirectory;
    private Directory tempDirectory;

    public FilesTreeVisitor(Directory rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        String ext = file.toString().replaceAll("^.*\\.", "");
        switch (ext.toLowerCase()) {
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
                setChildrenFiles(file, attrs);
        }
        return FileVisitResult.CONTINUE;
    }

    private void setChildrenFiles(Path pathFile, BasicFileAttributes attrs) {
        FileObject resultFileObject = new FileObject();
        File file = pathFile.toFile();
        resultFileObject.fillFromFile(file);
        resultFileObject.setFileSize(attrs.size());
        String ext = file.getName().replaceAll("^.*\\.", "");
        switch (ext.toLowerCase()) {
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

        File parentDir = pathFile.getParent().toFile();
        if (tempDirectory == null || !tempDirectory.equalsToFile(parentDir)) {
            DirectoryIterator directoryIterator = new DirectoryIterator(rootDirectory);
            tempDirectory = directoryIterator.getDirByPath(parentDir.getAbsolutePath());
        }
        if(tempDirectory == null){
            log.error(String.format("Ошибка при сканировании файла \'%s\' : директория \'%s\' не найдена",resultFileObject.getName(), parentDir.getAbsolutePath()));
        } else {
            resultFileObject.setDirectory(tempDirectory);
            tempDirectory.getFiles().add(resultFileObject);
        }
    }
}
