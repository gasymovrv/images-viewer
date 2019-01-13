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
    private final FileScanner fileScanner;

    public CommandLineRunner(FileObjectRepository foRep,
                             DirectoryRepository dirRep,
                             FileScanner fileScanner
    ) {
        this.fileObjectRepository = foRep;
        this.directoryRepository = dirRep;
        this.fileScanner = fileScanner;
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
        fileScanner.setPath(path);
        fileScanner.scanAndFillDB();
    }
}