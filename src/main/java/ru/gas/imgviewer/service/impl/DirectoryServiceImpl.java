package ru.gas.imgviewer.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.gas.imgviewer.entities.Directory;
import ru.gas.imgviewer.entities.FileObject;
import ru.gas.imgviewer.repositories.DirectoryRepository;
import ru.gas.imgviewer.service.DirectoryService;

import java.util.List;

@Service
@Slf4j
public class DirectoryServiceImpl implements DirectoryService {

	@Autowired
	DirectoryRepository directoryRepository;

	@Override
	public List<Directory> findAll() {
		return directoryRepository.findAll();
	}

	@Override
	public Directory findById(Long id) {
		return directoryRepository.findById(id).orElse(new Directory());
	}

	@Override
	public Directory saveOrUpdate(Directory expense) {
		return directoryRepository.save(expense);
	}

	@Override
	public List<Directory> findByName(String name) {
		return directoryRepository.findByName(name);
	}

}
