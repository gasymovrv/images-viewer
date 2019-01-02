package ru.gas.imgviewer.utils;

import org.springframework.stereotype.Component;
import ru.gas.imgviewer.entities.Directory;
import ru.gas.imgviewer.repositories.DirectoryRepository;
import ru.gas.imgviewer.repositories.FileObjectRepository;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class CommandLineRunner implements org.springframework.boot.CommandLineRunner {


    private final FileObjectRepository fileObjectRepository;
    private final DirectoryRepository directoryRepository;

    public CommandLineRunner(FileObjectRepository foRep,
                             DirectoryRepository dirRep) {
        this.fileObjectRepository = foRep;
        this.directoryRepository = dirRep;
    }

    @Override
    public void run(String... strings) throws Exception {
        String path = strings[0];
        File root = null;
        if (path != null) {
            System.out.println(path);
            root = new File(path);
        }
        if (root == null || !root.isDirectory()) {
            throw new IllegalArgumentException("Необходимо указать директорию (абсолютный путь)");
        }
        Directory rootDirectory = new Directory();
        rootDirectory.setName(root.getName());
        rootDirectory.setDirectoryPath(root.getAbsolutePath());
        Files.walkFileTree(
                Paths.get(rootDirectory.getDirectoryPath()),
                new SearchFileVisitor(rootDirectory));
        directoryRepository.save(rootDirectory);
    }
}