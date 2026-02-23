import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-av-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="av-shell">
      <!-- SIDEBAR -->
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed()">
        <button class="sidebar-collapse-btn" (click)="toggleSidebar()">
          <span class="material-icons-outlined collapse-icon">{{ sidebarCollapsed() ? 'menu' : 'menu_open' }}</span>
        </button>

        <nav class="sidebar-nav">
          <a class="nav-item" routerLink="/aula-virtual/dashboard">
            <span class="material-icons-outlined">auto_stories</span>
            <span class="nav-label">Zona de estudio</span>
          </a>
          <button class="nav-item has-children" (click)="videoclasesOpen.set(!videoclasesOpen())">
            <span class="material-icons-outlined">play_circle</span>
            <span class="nav-label">Videoclases</span>
            <span class="material-icons-outlined arrow">{{ videoclasesOpen() ? 'expand_less' : 'expand_more' }}</span>
          </button>
          <button class="nav-item has-children" (click)="testOpen.set(!testOpen())">
            <span class="material-icons-outlined">edit_note</span>
            <span class="nav-label">Test Prefortia</span>
            <span class="material-icons-outlined arrow">{{ testOpen() ? 'expand_less' : 'expand_more' }}</span>
          </button>
          <button class="nav-item has-children" (click)="materialesOpen.set(!materialesOpen())">
            <span class="material-icons-outlined">library_books</span>
            <span class="nav-label">Materiales</span>
            <span class="material-icons-outlined arrow">{{ materialesOpen() ? 'expand_less' : 'expand_more' }}</span>
          </button>
          <button class="nav-item has-children" (click)="temarioOpen.set(!temarioOpen())">
            <span class="material-icons-outlined">receipt_long</span>
            <span class="nav-label">Temario</span>
            <span class="material-icons-outlined arrow">{{ temarioOpen() ? 'expand_less' : 'expand_more' }}</span>
          </button>
          <button class="nav-item has-children" (click)="pruebasOpen.set(!pruebasOpen())">
            <span class="material-icons-outlined">fitness_center</span>
            <span class="nav-label">Pruebas físicas</span>
            <span class="material-icons-outlined arrow">{{ pruebasOpen() ? 'expand_less' : 'expand_more' }}</span>
          </button>
          <a class="nav-item" routerLink="/aula-virtual/dashboard">
            <span class="material-icons-outlined">quiz</span>
            <span class="nav-label">Simulacros virtuales</span>
          </a>
          <a class="nav-item" routerLink="/aula-virtual/dashboard">
            <span class="material-icons-outlined">place</span>
            <span class="nav-label">Eventos presenciales</span>
          </a>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->
      <div class="main-area">
        <!-- TOP HEADER -->
        <header class="top-header">
          <div class="header-left">
            <div class="header-logo">
              <div class="logo-icon">
                <span class="material-icons-outlined">shield</span>
              </div>
              <span class="logo-text">prefortia</span>
              <span class="logo-sep">|</span>
              <span class="material-icons-outlined" style="font-size:20px;color:#2e7d32;">construction</span>
            </div>
          </div>

          <div class="header-center">
            <div class="course-selector" (click)="dropdownOpen.set(!dropdownOpen())">
              <span class="selected-course">Curso de Ingreso a Guardia Civil (QA)</span>
              <span class="material-icons-outlined">{{ dropdownOpen() ? 'expand_less' : 'expand_more' }}</span>
            </div>

            @if (dropdownOpen()) {
              <div class="dropdown-menu">
                <div class="dropdown-item">
                  <span class="expand-arrow">&gt;</span>
                  [Único] Monográfico de armas de fuego 25/26 (132°)(QA)
                </div>
                <div class="dropdown-group">
                  <div class="group-header">
                    <span class="expand-arrow">∨</span>
                    13X Promoción test
                  </div>
                  <div class="dropdown-item sub">
                    Curso SLP Ingles Cambridge B2 (QA)
                  </div>
                  <div class="dropdown-item sub highlighted">
                    Curso de Ingreso a Guardia Civil (QA)
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="header-right">
            <button class="notification-btn">
              <span class="material-icons-outlined">notifications</span>
              Notificaciones
            </button>
            <div class="user-avatar">
              <span class="material-icons-outlined">person</span>
            </div>
            <div class="notification-badge">1</div>
            <button class="icon-btn">
              <span class="material-icons-outlined">expand_more</span>
            </button>
            <button class="icon-btn">
              <span class="material-icons-outlined">power_settings_new</span>
            </button>
          </div>
        </header>

        <!-- CONTENT -->
        <main class="content">
          <router-outlet />
        </main>
      </div>

      <!-- Chat fab -->
      <div class="chat-fab">
        <span class="material-icons-outlined">chat</span>
      </div>
    </div>
  `,
  styles: [`
    .av-shell {
      display: flex;
      min-height: 100vh;
      background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 40%, #e8f5e9 100%);
    }

    /* SIDEBAR */
    .sidebar {
      width: 200px;
      background: rgba(255,255,255,0.95);
      border-right: 1px solid rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      padding-top: 0.5rem;
      transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      will-change: width;
    }
    .sidebar.collapsed {
      width: 56px;
    }

    .sidebar-collapse-btn {
      padding: 0.5rem 0.8rem;
      background: none;
      color: #555;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      margin: 0.2rem 0.4rem;
      transition: background 0.2s;
    }
    .sidebar-collapse-btn:hover {
      background: rgba(46,125,50,0.08);
    }
    .collapse-icon {
      font-size: 22px;
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .sidebar-nav {
      flex: 1;
      padding: 0.5rem 0;
      overflow: hidden;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.6rem 1.2rem;
      color: #2e7d32;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      white-space: nowrap;
    }
    .nav-item:hover {
      background: rgba(46,125,50,0.06);
    }
    .nav-item .material-icons-outlined {
      font-size: 20px;
      color: #2e7d32;
      flex-shrink: 0;
    }
    .nav-label {
      flex: 1;
      opacity: 1;
      transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
                  max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: 200px;
      overflow: hidden;
    }
    .sidebar.collapsed .nav-label {
      opacity: 0;
      max-width: 0;
      transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1),
                  max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .arrow {
      font-size: 18px !important;
      color: #999 !important;
      flex-shrink: 0;
      opacity: 1;
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .sidebar.collapsed .arrow {
      opacity: 0;
    }

    /* MAIN AREA */
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* TOP HEADER */
    .top-header {
      height: 52px;
      background: rgba(255,255,255,0.95);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      flex-shrink: 0;
    }
    .header-left { display: flex; align-items: center; }
    .header-logo {
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
      font-size: 1.05rem;
      color: #1a1a1a;
    }
    .logo-sep {
      color: #ccc;
      margin: 0 0.2rem;
    }

    /* Course Selector */
    .header-center {
      position: relative;
    }
    .course-selector {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      color: #333;
      white-space: nowrap;
    }
    .course-selector:hover { background: #eee; }
    .selected-course { max-width: 320px; overflow: hidden; text-overflow: ellipsis; }

    /* Dropdown */
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.1);
      padding: 0.5rem 0;
      z-index: 100;
      min-width: 360px;
    }
    .dropdown-item {
      padding: 0.5rem 1rem;
      font-size: 0.84rem;
      color: #333;
      cursor: pointer;
    }
    .dropdown-item:hover { background: #f5f5f5; }
    .dropdown-item.sub { padding-left: 2rem; }
    .dropdown-item.highlighted {
      background: #fffde7;
    }
    .dropdown-group { }
    .group-header {
      padding: 0.5rem 1rem;
      font-size: 0.84rem;
      font-weight: 600;
      color: #333;
    }
    .expand-arrow {
      display: inline-block;
      width: 16px;
      margin-right: 0.3rem;
      color: #999;
    }

    /* Header right */
    .header-right {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .notification-btn {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: none;
      color: #555;
      font-size: 0.82rem;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
    }
    .notification-btn:hover { background: #f0f0f0; }
    .notification-btn span { font-size: 20px; }
    .user-avatar {
      width: 30px;
      height: 30px;
      background: #e0e0e0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-avatar span { font-size: 20px; color: #666; }
    .notification-badge {
      background: #f44336;
      color: white;
      font-size: 0.65rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -0.8rem;
      margin-top: -0.8rem;
    }
    .icon-btn {
      background: none;
      color: #666;
      padding: 4px;
      border-radius: 50%;
      display: flex;
    }
    .icon-btn:hover { color: #333; background: rgba(0,0,0,0.04); }

    /* CONTENT */
    .content {
      flex: 1;
      padding: 2rem;
    }

    /* Chat FAB */
    .chat-fab {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      width: 50px;
      height: 50px;
      background: #2e7d32;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(46,125,50,0.3);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .chat-fab:hover { transform: scale(1.1); }
    .chat-fab span { font-size: 24px; }
  `]
})
export class AvLayoutComponent {
  protected readonly sidebarCollapsed = signal(false);
  protected readonly dropdownOpen = signal(false);
  protected readonly videoclasesOpen = signal(false);
  protected readonly testOpen = signal(false);
  protected readonly materialesOpen = signal(false);
  protected readonly temarioOpen = signal(false);
  protected readonly pruebasOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }
}
