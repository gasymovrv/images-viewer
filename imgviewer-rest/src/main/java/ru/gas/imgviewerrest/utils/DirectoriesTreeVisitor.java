package ru.gas.imgviewerrest.utils;

import lombok.extern.slf4j.Slf4j;
import ru.gas.imgviewerrest.entities.Directory;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;


/**
 * Класс для прохождения по дереву директорий
 **/
@Slf4j
public class DirectoriesTreeVisitor extends SimpleFileVisitor<Path> {
    private Directory rootDirectory;
    private Directory tempDirectory;

    public DirectoriesTreeVisitor(Directory rootDirectory) {
        this.rootDirectory = rootDirectory;
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        fillRootFromPath(dir, attrs);
        return FileVisitResult.CONTINUE;
    }

    private void fillRootFromPath(Path pathDir, BasicFileAttributes attrs) {
        Directory resultDirectory = new Directory();
        resultDirectory.fillFromFile(pathDir.toFile());

        File parentDir = pathDir.getParent().toFile();
        if (tempDirectory == null || !tempDirectory.equalsToFile(parentDir)) {
            DirectoryIterator directoryIterator = new DirectoryIterator(rootDirectory);
            tempDirectory = directoryIterator.getDirByPath(parentDir.getAbsolutePath());
        }
        resultDirectory.setParent(tempDirectory);
        if (tempDirectory!=null) {
            tempDirectory.getChildren().add(resultDirectory);
        }
    }
}
