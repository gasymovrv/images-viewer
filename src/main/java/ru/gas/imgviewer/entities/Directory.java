package ru.gas.imgviewer.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "directory")
@ToString(exclude = {"files", "parent", "children"})
@EqualsAndHashCode(exclude = {"files", "parent", "children"})
@NoArgsConstructor
@AllArgsConstructor
public class Directory implements Serializable, CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter @Setter
	private Long id;

	@Column(name = "name")
	@Getter @Setter
	private String name;

	@Column(name = "directory_path")
	@Getter @Setter
	private String directoryPath;

	@Column(name = "file_size")
	private String fileSize;

    @JsonIgnore
    @OneToMany(mappedBy = "directory", cascade = CascadeType.ALL)
    @Getter @Setter
    private Set<FileObject> files = new HashSet<>(0);

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="parent_id")
    @Getter @Setter
    private Directory parent;

    @JsonIgnore
    @OneToMany(mappedBy="parent", cascade = CascadeType.ALL)
    @Getter @Setter
    private Set<Directory> children = new HashSet<>(0);
}
