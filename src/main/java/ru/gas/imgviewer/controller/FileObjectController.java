package ru.gas.imgviewer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.gas.imgviewer.entities.FileObject;
import ru.gas.imgviewer.service.FileObjectService;

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

    @GetMapping("/findById/{id}")
    public FileObject findById(@PathVariable Long id) {
        return fileObjectService.findById(id);
    }

    @GetMapping("/findByName/{name}")
    public Iterable<FileObject> findByName(@PathVariable String name) {
        return fileObjectService.findByName(name);
    }

}
