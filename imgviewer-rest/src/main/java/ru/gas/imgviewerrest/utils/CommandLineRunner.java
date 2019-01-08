package ru.gas.imgviewerrest.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.gas.imgviewerrest.entities.Directory;
import ru.gas.imgviewerrest.repositories.DirectoryRepository;
import ru.gas.imgviewerrest.repositories.FileObjectRepository;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
@Slf4j
public class CommandLineRunner implements org.springframework.boot.CommandLineRunner {
    private static final String ERROR_TEXT = "Первым аргументом программы необходимо указать директорию (абсолютный путь)";
    private final FileObjectRepository fileObjectRepository;
    private final DirectoryRepository directoryRepository;

    public CommandLineRunner(FileObjectRepository foRep,
                             DirectoryRepository dirRep) {
        this.fileObjectRepository = foRep;
        this.directoryRepository = dirRep;
    }

    @Override
    public void run(String... strings) throws Exception {
        String path = null;
        if (strings != null && strings.length > 0) {
            path = strings[0];
        } else {
            log.error(ERROR_TEXT);
            return;
        }
        File root = null;
        if (path != null) {
            root = new File(path);
        }
        if (root == null || !root.isDirectory()) {
            log.error(ERROR_TEXT);
            return;
        }

        log.warn(String.format("Запуск сканирования директории: %s", path));
        Directory rootDirectory = new Directory();
        rootDirectory.setName(root.getName());
        rootDirectory.setDirectoryPath(root.getAbsolutePath());
        Files.walkFileTree(
                Paths.get(rootDirectory.getDirectoryPath()),
                new DirectoriesTreeVisitor(rootDirectory));
        Files.walkFileTree(
                Paths.get(rootDirectory.getDirectoryPath()),
                new FilesTreeVisitor(rootDirectory));
        directoryRepository.save(rootDirectory);
    }
}