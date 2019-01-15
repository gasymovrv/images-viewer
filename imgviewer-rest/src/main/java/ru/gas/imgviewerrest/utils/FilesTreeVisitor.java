package ru.gas.imgviewerrest.utils;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import lombok.extern.slf4j.Slf4j;
import ru.gas.imgviewerrest.entities.Directory;
import ru.gas.imgviewerrest.entities.FileObject;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;


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
            case "mp4":
            case "3gp":
                fillRootFromPath(file, attrs);
        }
        return FileVisitResult.CONTINUE;
    }

    private void fillRootFromPath(Path pathFile, BasicFileAttributes attrs) {
        FileObject resultFileObject = new FileObject();
        File file = pathFile.toFile();
        resultFileObject.fillFromFile(file);
//        resultFileObject.setLastModified(getLastModifiedDateFromMetadata(file));
        resultFileObject.setFileSize(attrs.size());
        String ext = file.getName().replaceAll("^.*\\.", "");
        switch (ext.toLowerCase()) {
            case "mov":
            case "mpg":
            case "mp4":
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

    /** Очень замедляет сканирование
    * Если не используем, то нужно сменить метод репозитория
    * findByDirectoryIdOrderByLastModifiedAsc (сортировка по дате съемки) на
    * findByDirectoryIdOrderByNameAsc (сортировка по имени файла)
    */
    private LocalDateTime getLastModifiedDateFromMetadata(File f){
        LocalDateTime date = null;
        try {
            //Пробуем получить реальную дату съемки
            Metadata metadata = ImageMetadataReader.readMetadata(f);
            ExifSubIFDDirectory exif = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
            if (exif != null) {
                date = convertMillisToLocalDateUTC(exif.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL).getTime());
            }
        } catch (Exception ignored) {}
        //Если не получилось, то просто получаем дату создания файла
        if (date == null) {
            date = convertMillisToLocalDate(f.lastModified());
        }
        return date;
    }

    private LocalDateTime convertMillisToLocalDate(Long l) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(l), ZoneId.systemDefault());
    }

    private LocalDateTime convertMillisToLocalDateUTC(Long l) {
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(l), ZoneOffset.UTC);
    }

}
