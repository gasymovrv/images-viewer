package ru.gas.imgviewerrest.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.gas.imgviewerrest.entities.Directory;
import ru.gas.imgviewerrest.repositories.DirectoryRepository;
import ru.gas.imgviewerrest.service.DirectoryService;

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
