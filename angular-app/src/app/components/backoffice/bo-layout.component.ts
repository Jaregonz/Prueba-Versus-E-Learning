import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bo-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
    template: `
    <div class="bo-shell">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo-area">
            <div class="logo-icon">
              <span class="material-icons-outlined">shield</span>
            </div>
            <span class="logo-text">prefortia</span>
          </div>
          <span class="bo-label">BackOffice</span>
          <button class="sidebar-toggle" (click)="toggleSidebar()">
            <span class="material-icons-outlined">{{ sidebarCollapsed() ? 'chevron_right' : 'chevron_left' }}</span>
          </button>
        </div>

        <nav class="sidebar-nav">
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">people</span>
            <span class="nav-label">Usuarios</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">security</span>
            <span class="nav-label">Roles</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">smart_toy</span>
            <span class="nav-label">Alumnos y Bots</span>
          </a>

          <!-- Maestros (expanded) -->
          <div class="nav-group expanded">
            <button class="nav-item group-header" (click)="maestrosOpen.set(!maestrosOpen())">
              <span class="material-icons-outlined">menu_book</span>
              <span class="nav-label">Maestros</span>
              <span class="material-icons-outlined arrow">{{ maestrosOpen() ? 'expand_less' : 'expand_more' }}</span>
            </button>
            @if (maestrosOpen()) {
              <div class="nav-children">
                <a class="nav-item child active" routerLink="/backoffice/cursos" routerLinkActive="active">
                  <span class="nav-label">Cursos</span>
                </a>
                <a class="nav-item child" routerLink="/backoffice">
                  <span class="nav-label">Asignaturas</span>
                </a>
                <a class="nav-item child" routerLink="/backoffice">
                  <span class="nav-label">Preguntas</span>
                </a>
                <a class="nav-item child" routerLink="/backoffice">
                  <span class="nav-label">Exámenes</span>
                </a>
              </div>
            }
          </div>

          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">event_note</span>
            <span class="nav-label">Convocatorias</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">location_on</span>
            <span class="nav-label">Sedes</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">folder</span>
            <span class="nav-label">Materiales</span>
          </a>
          <div class="nav-group">
            <button class="nav-item group-header" (click)="puntuacionesOpen.set(!puntuacionesOpen())">
              <span class="material-icons-outlined">star</span>
              <span class="nav-label">Puntuaciones</span>
              <span class="material-icons-outlined arrow">{{ puntuacionesOpen() ? 'expand_less' : 'expand_more' }}</span>
            </button>
          </div>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">podcasts</span>
            <span class="nav-label">Emisiones</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">warning_amber</span>
            <span class="nav-label">Avisos importantes</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">school</span>
            <span class="nav-label">Tutorías</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">chat_bubble_outline</span>
            <span class="nav-label">Dudas</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">psychology</span>
            <span class="nav-label">Métodos de estudio</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">quiz</span>
            <span class="nav-label">Simulacros virtuales</span>
          </a>
          <a class="nav-item" routerLink="/backoffice">
            <span class="material-icons-outlined">sell</span>
            <span class="nav-label">Descuentos</span>
          </a>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->
      <div class="main-area">
        <!-- TOP HEADER -->
        <header class="top-header">
          <div class="header-left">
            <a routerLink="/" class="back-home">
              <span class="material-icons-outlined">home</span>
            </a>
          </div>
          <div class="header-right">
            <div class="user-badge">
              <div class="user-avatar">
                <span class="material-icons-outlined">person</span>
              </div>
              <div class="user-info">
                <span class="user-role">CALIDAD</span>
                <span class="user-name">ADMINISTRADOR (AUTO)</span>
              </div>
            </div>
            <button class="icon-btn">
              <span class="material-icons-outlined">power_settings_new</span>
            </button>
          </div>
        </header>

        <!-- CONTENT -->
        <main class="content">
          <router-outlet />
        </main>

        <!-- FOOTER -->
        <footer class="bo-footer">
          v. 1.34.0 &nbsp; Build ID: 1771588569189
        </footer>
      </div>
    </div>
  `,
    styles: [`
    .bo-shell {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }

    /* SIDEBAR */
    .sidebar {
      width: 220px;
      background: #1a1a1a;
      color: #fff;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow-y: auto;
    }
    .sidebar-header {
      display: flex;
      align-items: center;
      padding: 0.9rem 1rem;
      gap: 0.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .logo-area {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .logo-icon {
      width: 32px;
      height: 32px;
      background: #2e7d32;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-icon span { font-size: 18px; color: white; }
    .logo-text {
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
    }
    .bo-label {
      font-weight: 700;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.7);
    }
    .sidebar-toggle {
      margin-left: auto;
      background: none;
      color: rgba(255,255,255,0.5);
      padding: 4px;
      border-radius: 4px;
    }
    .sidebar-toggle:hover { color: white; }

    /* NAV */
    .sidebar-nav {
      flex: 1;
      padding: 0.5rem 0;
      overflow-y: auto;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.55rem 1.2rem;
      color: rgba(255,255,255,0.7);
      font-size: 0.85rem;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.15s;
      background: none;
      width: 100%;
      text-align: left;
      border: none;
    }
    .nav-item:hover {
      color: #fff;
      background: rgba(255,255,255,0.06);
    }
    .nav-item.active {
      color: #fff;
      background: rgba(255,255,255,0.1);
      font-weight: 500;
    }
    .nav-item .material-icons-outlined {
      font-size: 20px;
      flex-shrink: 0;
    }
    .nav-label { flex: 1; }
    .arrow { font-size: 18px !important; }
    .nav-children {
      padding-left: 1rem;
    }
    .nav-item.child {
      padding-left: 2.4rem;
      font-size: 0.82rem;
    }
    .nav-item.child.active {
      color: #4caf50;
      background: rgba(76,175,80,0.08);
    }

    /* GROUP */
    .group-header { font-weight: 500; }

    /* MAIN AREA */
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    /* TOP HEADER */
    .top-header {
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      flex-shrink: 0;
    }
    .header-left {
      display: flex;
      align-items: center;
    }
    .back-home {
      color: #666;
      display: flex;
      align-items: center;
    }
    .back-home:hover { color: #333; }
    .header-right {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #2e7d32;
      color: white;
      padding: 0.3rem 0.8rem 0.3rem 0.4rem;
      border-radius: 20px;
    }
    .user-avatar {
      width: 28px;
      height: 28px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-avatar span { font-size: 18px; }
    .user-info {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .user-role {
      font-size: 0.65rem;
      font-weight: 600;
      opacity: 0.9;
    }
    .user-name {
      font-size: 0.7rem;
      font-weight: 500;
    }
    .icon-btn {
      background: none;
      color: #666;
      padding: 6px;
      border-radius: 50%;
      display: flex;
    }
    .icon-btn:hover { color: #333; background: #f0f0f0; }

    /* CONTENT */
    .content {
      flex: 1;
      padding: 1.5rem 2rem;
      overflow-y: auto;
    }

    /* FOOTER */
    .bo-footer {
      padding: 0.6rem 2rem;
      text-align: center;
      font-size: 0.72rem;
      color: #999;
      border-top: 1px solid #e0e0e0;
      background: #fff;
    }
  `]
})
export class BoLayoutComponent {
    protected readonly sidebarCollapsed = signal(false);
    protected readonly maestrosOpen = signal(true);
    protected readonly puntuacionesOpen = signal(false);

    toggleSidebar() {
        this.sidebarCollapsed.update(v => !v);
    }
}
