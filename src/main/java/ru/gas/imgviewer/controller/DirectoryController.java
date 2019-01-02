package ru.gas.imgviewer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.gas.imgviewer.entities.Directory;
import ru.gas.imgviewer.entities.FileObject;
import ru.gas.imgviewer.service.DirectoryService;
import ru.gas.imgviewer.service.FileObjectService;

import java.util.List;


@RestController
@RequestMapping("api/directories")
public class DirectoryController {

    @Autowired
    private DirectoryService directoryService;

    @GetMapping("/findAll")
    public List<Directory> findAll() {
        return directoryService.findAll();
    }

    @GetMapping("/findById/{id}")
    public Directory findById(@PathVariable Long id) {
        return directoryService.findById(id);
    }

    @GetMapping("/findByName/{name}")
    public Iterable<Directory> findByName(@PathVariable String name) {
        return directoryService.findByName(name);
    }

}
