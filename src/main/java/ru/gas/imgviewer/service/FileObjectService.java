package ru.gas.imgviewer.service;

import ru.gas.imgviewer.entities.FileObject;

import java.util.List;

public interface FileObjectService {

	List<FileObject> findAll();

	FileObject findById(Long id);
	
	List<FileObject> findByName(String name);

	List<FileObject> findByDirectoryName(String name);
}
