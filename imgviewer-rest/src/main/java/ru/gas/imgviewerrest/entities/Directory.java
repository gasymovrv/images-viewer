package ru.gas.imgviewerrest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.File;
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

    @OneToMany(mappedBy="parent", cascade = CascadeType.ALL)
    @Getter @Setter
    private Set<Directory> children = new HashSet<>(0);

    public Directory fillFromFile(File f){
        this.setName(f.getName());
        this.setDirectoryPath(f.getAbsolutePath());
        return this;
    }

    public boolean equalsToFile(File f){
        return directoryPath.equals(f.getAbsolutePath());
    }

    public boolean equalsToPath(String path){
        return directoryPath.equals(path);
    }
}
