package ru.gas.imgviewerrest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.gas.imgviewerrest.entities.Directory;
import ru.gas.imgviewerrest.service.DirectoryService;
import ru.gas.imgviewerrest.utils.FileScanner;

import java.util.List;


@RestController
@RequestMapping("api/directories")
@Slf4j
public class DirectoryController {

    @Autowired
    private DirectoryService directoryService;
    @Autowired
    private FileScanner fileScanner;

    @GetMapping("/findAll")
    public List<Directory> findAll() {
        return directoryService.findAll();
    }

    @GetMapping("/findRoot")
    public Directory findRoot() {
        return directoryService.findByParentIsNull();
    }

    @GetMapping("/findById/{id}")
    public Directory findById(@PathVariable Long id) {
        return directoryService.findById(id);
    }

    @GetMapping("/findByName/{name}")
    public Iterable<Directory> findByName(@PathVariable String name) {
        return directoryService.findByName(name);
    }

    @GetMapping("/refresh")
    public void refresh() {
        fileScanner.scanAndFillDB();
    }


}
