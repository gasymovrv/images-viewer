package ru.gas.imgviewerrest.service;

import ru.gas.imgviewerrest.dto.PageDto;
import ru.gas.imgviewerrest.entities.FileObject;

import java.util.List;

public interface FileObjectService {

	List<FileObject> findAll();

	PageDto<FileObject> findAll(int page, int size);

	FileObject findById(Long id);
	
	List<FileObject> findByName(String name);

	List<FileObject> findByDirectoryName(String name);
}
