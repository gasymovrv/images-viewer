package ru.gas.imgviewer.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.gas.imgviewer.entities.FileObject;

import java.util.List;
import java.util.Optional;

public interface FileObjectRepository extends JpaRepository<FileObject, Long> {

	List<FileObject> findAll();

	Page<FileObject> findAll(Pageable pageable);

	Optional<FileObject> findById(Long id);

	List<FileObject> findByName(String name);
}
