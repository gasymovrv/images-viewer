package ru.gas.imgviewer.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.gas.imgviewer.entities.FileObject;
import ru.gas.imgviewer.repositories.FileObjectRepository;
import ru.gas.imgviewer.service.FileObjectService;

import java.util.List;

@Service
@Slf4j
public class FileObjectServiceImpl implements FileObjectService {

	@Autowired
	FileObjectRepository fileObjectRepository;

	@Override
	public List<FileObject> findAll() {
		return fileObjectRepository.findAll();
	}

	@Override
	public FileObject findById(Long id) {
		return fileObjectRepository.findById(id).orElse(new FileObject());
	}

	@Override
	public FileObject saveOrUpdate(FileObject expense) {
		return fileObjectRepository.save(expense);
	}

	@Override
	public List<FileObject> findByName(String name) {
		return fileObjectRepository.findByName(name);
	}

}
