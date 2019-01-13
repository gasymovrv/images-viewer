package ru.gas.imgviewerrest.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import ru.gas.imgviewerrest.entities.Directory;
import ru.gas.imgviewerrest.repositories.DirectoryRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Component
@Slf4j
public class FileScanner {
    private static final String ERROR_TEXT = "Указанный путь пуст или не является директорией";

    @Autowired
    private DirectoryRepository directoryRepository;

    private String path;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void scanAndFillDB() {
        File root = null;
        if (path != null) {
            root = new File(path);
        }
        if (root == null || !root.isDirectory()) {
            log.error(ERROR_TEXT);
            return;
        }

        try {
            List<Directory> rootFromRepository = directoryRepository.findByParentIsNull();
            if(!CollectionUtils.isEmpty(rootFromRepository)){
                directoryRepository.deleteAll(rootFromRepository);
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
            log.warn(String.format("Успешно просканировано и сохранено в БД: %s", path));
        } catch (IOException e) {
            log.error(String.format("Ошибка при сканировании директории \'%s\' : ",path), e);
        }
    }
}
