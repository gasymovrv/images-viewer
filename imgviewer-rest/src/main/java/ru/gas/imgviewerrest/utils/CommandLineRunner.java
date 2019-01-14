package ru.gas.imgviewerrest.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.gas.imgviewerrest.repositories.DirectoryRepository;
import ru.gas.imgviewerrest.repositories.FileObjectRepository;

@Component
@Slf4j
public class CommandLineRunner implements org.springframework.boot.CommandLineRunner {
    private static final String INFO_TEXT = "CommandLineRunner: Первым аргументом программы абсолютный путь к директории не указан - включен режим установки пути в RUNTIME";
    private final FileScanner fileScanner;

    public CommandLineRunner(FileScanner fileScanner) {
        this.fileScanner = fileScanner;
    }

    @Override
    public void run(String... strings) throws Exception {
        String path = null;
        if (strings != null && strings.length > 0) {
            path = strings[0];
        } else {
            log.info(INFO_TEXT);
            return;
        }
        fileScanner.setPath(path);
        fileScanner.scanAndFillDB();
    }
}