package ru.gas.imgviewer.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "file_object")
@ToString(exclude = "directory")
@EqualsAndHashCode(exclude = "directory")
@NoArgsConstructor
@AllArgsConstructor
public class FileObject implements Serializable, CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter @Setter
	private Long id;

	@Column(name = "name")
	@Getter @Setter
	private String name;

	@Column(name = "is_video")
	@Getter @Setter
	private Boolean isVideo = Boolean.FALSE;

	@Column(name = "file_path")
	@Getter @Setter
	private String filePath;

	@Column(name = "file_size")
	@Getter @Setter
	private Long fileSize;

	@Column(name = "ext")
	@Getter @Setter
	private String ext;

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="directory_id")
	@Getter @Setter
	private Directory directory;
}
