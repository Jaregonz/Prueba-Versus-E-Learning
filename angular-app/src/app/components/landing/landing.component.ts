import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="landing">
      <div class="landing-header">
        <div class="logo">
          <div class="logo-icon">
            <span class="material-icons-outlined">shield</span>
          </div>
          <div class="logo-text">
            <span class="brand">prefortia</span>
            <span class="sub">Plataforma E-Learning</span>
          </div>
        </div>
      </div>
      
      <div class="landing-content">
        <h1>Bienvenido a Versus eLearning</h1>
        <p class="subtitle">Selecciona la aplicación a la que deseas acceder</p>
        
        <div class="cards">
          <a routerLink="/backoffice" class="card card-bo">
            <div class="card-icon">
              <span class="material-icons-outlined">admin_panel_settings</span>
            </div>
            <h2>BackOffice</h2>
            <p>Panel de administración para gestión de cursos, usuarios, exámenes y materiales.</p>
            <div class="card-footer">
              <span class="material-icons-outlined">arrow_forward</span>
              Acceder
            </div>
          </a>
          
          <a routerLink="/aula-virtual" class="card card-av">
            <div class="card-icon">
              <span class="material-icons-outlined">school</span>
            </div>
            <h2>Aula Virtual</h2>
            <p>Plataforma del estudiante para acceder a contenidos, exámenes y sesiones en vivo.</p>
            <div class="card-footer">
              <span class="material-icons-outlined">arrow_forward</span>
              Acceder
            </div>
          </a>
        </div>
        
        <div class="version">v.1.34.0 · Versus eLearning Monorepo Front</div>
      </div>
    </div>
  `,
  styles: [`
    .landing {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
      display: flex;
      flex-direction: column;
    }
    .landing-header {
      padding: 1.5rem 2.5rem;
      display: flex;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .logo-icon {
      width: 42px;
      height: 42px;
      background: #2e7d32;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .logo-icon span { font-size: 24px; }
    .brand {
      font-weight: 700;
      font-size: 1.3rem;
      color: #1a1a1a;
    }
    .sub {
      display: block;
      font-size: 0.75rem;
      color: #666;
      margin-top: -2px;
    }
    .landing-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #666;
      font-size: 1rem;
      margin-bottom: 3rem;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 720px;
      width: 100%;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      border: 2px solid transparent;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    .card-bo:hover { border-color: #1a1a1a; }
    .card-av:hover { border-color: #2e7d32; }
    .card-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.2rem;
    }
    .card-icon span { font-size: 28px; }
    .card-bo .card-icon {
      background: #f0f0f0;
      color: #1a1a1a;
    }
    .card-av .card-icon {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .card h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }
    .card p {
      color: #666;
      font-size: 0.9rem;
      flex: 1;
      line-height: 1.5;
    }
    .card-footer {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 1.5rem;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .card-bo .card-footer { color: #1a1a1a; }
    .card-av .card-footer { color: #2e7d32; }
    .card-footer span { font-size: 18px; }
    .version {
      margin-top: 3rem;
      color: #aaa;
      font-size: 0.8rem;
    }
    @media (max-width: 640px) {
      .cards { grid-template-columns: 1fr; }
    }
  `]
})
export class LandingComponent { }
