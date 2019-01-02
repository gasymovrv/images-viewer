package ru.gas.imgviewerrest.service;

import ru.gas.imgviewerrest.entities.Directory;

import java.util.List;

public interface DirectoryService {

	List<Directory> findAll();

	Directory findById(Long id);
	
	List<Directory> findByName(String name);

	Directory saveOrUpdate(Directory directory);

}
