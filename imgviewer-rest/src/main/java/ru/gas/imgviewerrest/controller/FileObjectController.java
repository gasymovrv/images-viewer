package ru.gas.imgviewerrest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.gas.imgviewerrest.dto.PageDto;
import ru.gas.imgviewerrest.entities.FileObject;
import ru.gas.imgviewerrest.service.FileObjectService;

import java.util.List;


@RestController
@RequestMapping("api/files")
public class FileObjectController {

    @Autowired
    private FileObjectService fileObjectService;

    @GetMapping("/findAll")
    public List<FileObject> findAll() {
        return fileObjectService.findAll();
    }

    @GetMapping("/findAll/{page}/{size}")
    public PageDto<FileObject> findAll(@PathVariable Integer page, @PathVariable Integer size) {
        return fileObjectService.findAll(page, size);
    }

    @GetMapping("/findById/{id}")
    public FileObject findById(@PathVariable Long id) {
        return fileObjectService.findById(id);
    }

    @GetMapping("/findByName/{name}")
    public Iterable<FileObject> findByName(@PathVariable String name) {
        return fileObjectService.findByName(name);
    }

    @GetMapping("/findByDirectoryName/{name}")
    public Iterable<FileObject> findByDirectoryName(@PathVariable String name) {
        return fileObjectService.findByDirectoryName(name);
    }


}
