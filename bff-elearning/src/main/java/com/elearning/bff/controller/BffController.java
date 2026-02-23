package com.elearning.bff.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
