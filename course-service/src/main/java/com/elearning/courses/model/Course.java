package com.elearning.courses.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String category;
    private String status;

    /**
     * Nivel de dificultad del curso.
     * Valores por defecto: 'Principiante'
     **/
    @Column(name = "difficulty_level")
    private String difficultyLevel;

    /**
     * Indica si un curso ha sido marcado con 'Me gusta'.
     * Valores por defecto: FALSE
     **/
    @Column(name = "is_liked")
    private Boolean isLiked;

    @Column(name = "last_modified")
    private LocalDateTime lastModified;

    @Column(name = "last_modified_user")
    private String lastModifiedUser;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getLastModified() { return lastModified; }
    public void setLastModified(LocalDateTime lastModified) { this.lastModified = lastModified; }
    public String getLastModifiedUser() { return lastModifiedUser; }
    public void setLastModifiedUser(String lastModifiedUser) { this.lastModifiedUser = lastModifiedUser; }
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficulty_level) { this.difficultyLevel = difficulty_level; }
    public Boolean getIsLiked() { return isLiked; }
    public void setIsLiked(Boolean isLiked) { this.isLiked = isLiked; }
}
