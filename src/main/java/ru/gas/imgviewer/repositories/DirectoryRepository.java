package ru.gas.imgviewer.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.gas.imgviewer.entities.Directory;
import ru.gas.imgviewer.entities.FileObject;

import java.util.List;
import java.util.Optional;

public interface DirectoryRepository extends JpaRepository<Directory, Long> {

	List<Directory> findAll();

	Page<Directory> findAll(Pageable pageable);

	Optional<Directory> findById(Long id);

	List<Directory> findByName(String name);
}
