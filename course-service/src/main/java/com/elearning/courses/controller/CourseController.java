package com.elearning.courses.controller;

import com.elearning.courses.CoursesApplication;
import com.elearning.courses.model.Course;
import com.elearning.courses.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository repository;

    public CourseController(CourseRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return repository.findAll();
    }

    /**
     * Endpoint para dar 'Me gusta' a un curso. Cambia el estado de isLiked a true o false dependiendo del estado actual.
     * Si el curso ya tiene 'Me gusta', al llamar a este endpoint se quitará el 'Me gusta'.
     * @param id ID del curso al que se le da 'Me gusta'.
     * @return Se devuelve el curso con la propiedad isLiked modificada.
     */
    @PutMapping("/{id}/like")
    public Course likeCourse(@PathVariable Long id) {
        Course course = repository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        course.setIsLiked(!Boolean.TRUE.equals(course.getIsLiked()));
        return repository.save(course);
    }
}

