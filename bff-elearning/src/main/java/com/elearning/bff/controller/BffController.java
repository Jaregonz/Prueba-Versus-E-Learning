package com.elearning.bff.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/bff/courses")
@CrossOrigin(origins = "http://localhost:4200")
public class BffController {

    @Value("${services.course-service.url}")
    private String courseServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping
    public ResponseEntity<List<Object>> getCoursesForFrontend() {
        ResponseEntity<List<Object>> response = restTemplate.exchange(
                courseServiceUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Object>>() {}
        );
        return ResponseEntity.ok(response.getBody());
    }

    /**
     * Endpoint para dar 'Me gusta' a un curso. Cambia el estado de isLiked a true o false dependiendo del estado actual.
     * Si el curso ya tiene 'Me gusta', al llamar a este endpoint se quitará el 'Me gusta'.
     * @param id ID del curso al que se le da 'Me gusta'.
     * @return Se devuelve el curso con la propiedad isLiked modificada.
     */
    @PutMapping("/{id}/like")
    public ResponseEntity<Object> likeCourse(@PathVariable Long id) {
        String url = courseServiceUrl + "/" + id + "/like";

        ResponseEntity<Object> response = restTemplate.exchange(
                url,
                HttpMethod.PUT,
                null,
                Object.class
        );
        return ResponseEntity.ok(response.getBody());
    }
}
