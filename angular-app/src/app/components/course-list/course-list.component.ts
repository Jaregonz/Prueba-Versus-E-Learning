import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../services/course.service';

@Component({
    selector: 'app-course-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
    courses: Course[] = [];
    loading = true;
    error = '';

    constructor(private courseService: CourseService) { }

    ngOnInit(): void {
        this.courseService.getCourses().subscribe({
            next: (data) => {
                this.courses = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching courses', err);
                this.error = 'No se pudieron cargar los cursos. Verifica que los servicios estén activos.';
                this.loading = false;
            }
        });
    }
}
