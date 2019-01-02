package ru.gas.imgviewer.service;

import ru.gas.imgviewer.entities.Directory;
import ru.gas.imgviewer.entities.FileObject;

import java.util.List;

public interface DirectoryService {

	List<Directory> findAll();

	Directory findById(Long id);
	
	List<Directory> findByName(String name);

	Directory saveOrUpdate(Directory directory);

}
