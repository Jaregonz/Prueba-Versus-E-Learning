import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Course {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    lastModified: string;
    lastModifiedUser: string;
}

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiUrl = '/api/bff/courses';

    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(courses => courses.map(c => ({
                id: c.id,
                title: c.title,
                description: c.description,
                category: c.category || 'Ingreso',
                status: c.status || 'Activo',
                lastModified: c.last_modified || c.lastModified || new Date().toISOString(),
                lastModifiedUser: c.last_modified_user || c.lastModifiedUser || 'admin'
            }))),
            catchError(() => {
                // Fallback mock data if API is not available
                return of(this.getMockCourses());
            })
        );
    }

    private getMockCourses(): Course[] {
        return [
            { id: 1, title: 'Curso Knowmad Mood QA', description: 'Curso de Quality Assurance.', category: 'Categoría Curso QA', status: 'Activo', lastModified: '28 ENE 2026 - 10:34', lastModifiedUser: 'jcampuzano' },
            { id: 2, title: 'Curso de Ingreso a Guardia Civil ...', description: 'Preparación oposiciones GC.', category: 'Ingreso', status: 'Activo', lastModified: '28 ENE 2026 - 03:22', lastModifiedUser: 'mdoloresalados' },
            { id: 3, title: 'Curso SLP Ingles Cambridge B2 ...', description: 'Cambridge B2 nivel SLP.', category: 'Ingreso', status: 'Activo', lastModified: '02 FEB 2026 - 02:25', lastModifiedUser: 'mdoloresalados' },
            { id: 4, title: 'Ascenso Guardia Civil', description: 'Preparación ascenso GC.', category: 'Sargento', status: 'Activo', lastModified: '11 FEB 2026 - 11:50', lastModifiedUser: 'luca_borgato' },
            { id: 5, title: 'Curso maestro ascenso cabo', description: 'Ascenso a cabo.', category: 'CABO', status: 'Activo', lastModified: '11 FEB 2026 - 12:24', lastModifiedUser: 'lucia_alfonso' },
            { id: 6, title: 'Ingreso GC', description: 'Ingreso Guardia Civil.', category: 'Ingreso', status: 'Activo', lastModified: '13 FEB 2026 - 02:22', lastModifiedUser: 'davinia_garcia' },
            { id: 7, title: 'test', description: 'Curso de prueba.', category: 'Ingreso', status: 'Activo', lastModified: '13 FEB 2026 - 02:50', lastModifiedUser: 'dvazquez' }
        ];
    }
}
