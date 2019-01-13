package ru.gas.imgviewerrest.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ru.gas.imgviewerrest.dto.PageDto;
import ru.gas.imgviewerrest.entities.FileObject;
import ru.gas.imgviewerrest.repositories.FileObjectRepository;
import ru.gas.imgviewerrest.service.FileObjectService;

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
	public PageDto<FileObject> findAll(int page, int size) {
		Page<FileObject> somethings = fileObjectRepository.findAll(PageRequest.of(page, size));
		return new PageDto<>(somethings.getTotalElements(), somethings.getContent());
	}

	@Override
	public FileObject findById(Long id) {
		return fileObjectRepository.findById(id).orElse(new FileObject());
	}

	@Override
	public List<FileObject> findByName(String name) {
		return fileObjectRepository.findByName(name);
	}

	@Override
	public List<FileObject> findByDirectoryName(String name) {
		return fileObjectRepository.findByDirectoryName(name);
	}

	@Override
	public PageDto<FileObject> findByDirectoryId(Long id, int page, int size) {
		Page<FileObject> somethings = fileObjectRepository.findByDirectoryIdOrderByNameAsc(id, PageRequest.of(page, size));
		return new PageDto<>(somethings.getTotalElements(), somethings.getContent());
	}

}
