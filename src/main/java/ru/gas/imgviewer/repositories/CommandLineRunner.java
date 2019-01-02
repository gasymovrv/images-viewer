package ru.gas.imgviewer.repositories;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;
import ru.gas.imgviewer.entities.Directory;
import ru.gas.imgviewer.entities.FileObject;

import java.io.File;
import java.util.*;

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
        Iterator<File> iter = FileUtils.iterateFiles(root, new String[]{"png", "jpg", "3gp", "MOV", "mpg"}, false);
        Directory directory = new Directory();
        directory.setName(root.getName());
        directory.setDirectoryPath(root.getAbsolutePath());
        File f;
        while (iter.hasNext()) {
            f = iter.next();
            FileObject fo = new FileObject();
            fo.setDirectory(directory);
            fo.setFilePath(f.getAbsolutePath());
            fo.setName(f.getName());
            directory.getFiles().add(fo);
            String ext = f.getName().replaceAll("^.*\\.", "");
            switch (ext){
                case "mov":
                case "mpg":
                case "3gp":
                    fo.setIsVideo(true);
            }
            fo.setExt(ext);
            fo.setFileSize(f.getTotalSpace());
        }
        directoryRepository.save(directory);
    }
}