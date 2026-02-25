import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';

@Component({
    selector: 'app-av-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="dashboard">
      <div class="welcome">
        <h1>Bienvenido al Aula Virtual</h1>
        <p>Accede a tus cursos, materiales y herramientas de estudio.</p>
      </div>

      <!-- Quick stats -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon">
            <span class="material-icons-outlined">school</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ courses().length }}</span>
            <span class="stat-label">Cursos activos</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">
            <span class="material-icons-outlined">assignment</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">12</span>
            <span class="stat-label">Test pendientes</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue">
            <span class="material-icons-outlined">video_library</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">8</span>
            <span class="stat-label">Videoclases nuevas</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">
            <span class="material-icons-outlined">emoji_events</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">85%</span>
            <span class="stat-label">Progreso medio</span>
          </div>
        </div>
      </div>

      <!-- Courses section -->
      <div class="section-header">
        <h2>Mis Cursos</h2>
      </div>

      @if (loading()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando cursos...</p>
        </div>
      }

      @if (!loading()) {
        <div class="course-grid">
          @for (course of courses(); track course.id) {
            <div class="course-card">
              <div class="card-top" [class]="getCardColorClass(course.category)">
                <span class="material-icons-outlined card-icon">menu_book</span>
                <span class="card-category">{{ course.category }}</span>
              </div>
              <div class="card-body">
                <h3>{{ course.title }}</h3>
                <p>{{ course.description }}</p>
                <p>Dificultad: {{ course.difficultyLevel }}</p>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width]="getRandomProgress() + '%'"></div>
                </div>
                <span class="progress-label">Progreso</span>
              </div>
              <div class="card-footer">
                <button class="btn-access">
                  Acceder
                  <span class="material-icons-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          }
        </div>
      }

      <!-- Back to home -->
      <div class="back-row">
        <a routerLink="/" class="back-link">
          <span class="material-icons-outlined">arrow_back</span>
          Volver al inicio
        </a>
      </div>
    </div>
  `,
    styles: [`
    .dashboard { }

    .welcome {
      margin-bottom: 2rem;
    }
    .welcome h1 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 0.3rem;
    }
    .welcome p {
      color: #666;
      font-size: 0.95rem;
    }

    /* Stats */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: rgba(255,255,255,0.9);
      border-radius: 12px;
      padding: 1.2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .stat-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: #e8f5e9;
      color: #2e7d32;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stat-icon.orange { background: #fff3e0; color: #e65100; }
    .stat-icon.blue { background: #e3f2fd; color: #1565c0; }
    .stat-icon.purple { background: #f3e5f5; color: #7b1fa2; }
    .stat-icon span { font-size: 24px; }
    .stat-value {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a1a1a;
      display: block;
      line-height: 1.2;
    }
    .stat-label {
      font-size: 0.78rem;
      color: #888;
    }

    /* Section */
    .section-header {
      margin-bottom: 1rem;
    }
    .section-header h2 {
      font-size: 1.15rem;
      font-weight: 600;
      color: #333;
    }

    /* Course grid */
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.2rem;
      margin-bottom: 2rem;
    }
    .course-card {
      background: rgba(255,255,255,0.95);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .course-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    }
    .card-top {
      padding: 1rem 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-top.green { background: linear-gradient(135deg, #43a047, #2e7d32); color: white; }
    .card-top.brown { background: linear-gradient(135deg, #6d4c41, #4e342e); color: white; }
    .card-top.dark { background: linear-gradient(135deg, #37474f, #263238); color: white; }
    .card-top.amber { background: linear-gradient(135deg, #ffa000, #f57f17); color: white; }
    .card-icon { font-size: 24px; }
    .card-category { font-size: 0.75rem; font-weight: 600; opacity: 0.9; }
    .card-body {
      padding: 1rem 1.2rem;
    }
    .card-body h3 {
      font-size: 0.92rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 0.4rem;
      line-height: 1.3;
    }
    .card-body p {
      font-size: 0.82rem;
      color: #888;
      margin: 0 0 0.8rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .progress-bar {
      width: 100%;
      height: 6px;
      background: #f0f0f0;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 0.3rem;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #66bb6a, #2e7d32);
      border-radius: 3px;
      transition: width 0.5s ease;
    }
    .progress-label {
      font-size: 0.7rem;
      color: #aaa;
    }
    .card-footer {
      padding: 0.8rem 1.2rem;
      border-top: 1px solid #f5f5f5;
    }
    .btn-access {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: none;
      color: #2e7d32;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 0;
    }
    .btn-access:hover { color: #1b5e20; }
    .btn-access span { font-size: 16px; }

    /* Loading */
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      color: #666;
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e0e0e0;
      border-top: 3px solid #2e7d32;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 0.8rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Back */
    .back-row { margin-top: 1rem; }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      color: #2e7d32;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .back-link:hover { text-decoration: underline; }
    .back-link span { font-size: 18px; }

    @media (max-width: 768px) {
      .stats-row { grid-template-columns: repeat(2, 1fr); }
      .course-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AvDashboardComponent implements OnInit {
    protected readonly courses = signal<Course[]>([]);
    protected readonly loading = signal(true);

    constructor(private courseService: CourseService) { }

    ngOnInit(): void {
        this.courseService.getCourses().subscribe({
            next: (data) => {
                this.courses.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    getCardColorClass(category: string): string {
        const cat = category.toLowerCase();
        if (cat.includes('ingreso')) return 'green';
        if (cat.includes('sargento')) return 'brown';
        if (cat.includes('cabo')) return 'dark';
        return 'amber';
    }

    getRandomProgress(): number {
        return Math.floor(Math.random() * 60) + 30;
    }
}
