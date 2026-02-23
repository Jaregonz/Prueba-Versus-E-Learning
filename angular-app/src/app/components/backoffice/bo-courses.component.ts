import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../services/course.service';

interface ColumnDef {
  key: string;
  label: string;
  sortable: boolean;
  filterable: boolean;
}

type SortDirection = 'asc' | 'desc' | 'none';

@Component({
  selector: 'app-bo-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="courses-page">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="#">CURSOS</a>
        <span class="sep">&gt;</span>
        <span>LISTADO DE CURSOS</span>
      </nav>

      <!-- Title Row -->
      <div class="title-row">
        <h1>Cursos</h1>
        <button class="btn-create">
          <span class="material-icons-outlined">add_circle_outline</span>
          Crear curso
        </button>
      </div>

      <!-- Column selector -->
      <div class="column-selector">
        <span class="selector-label">Selector de columnas</span>
        <div class="chips">
          @for (col of columns; track col.key) {
            <span
              class="chip"
              [class.active]="isColumnVisible(col.key)"
              [class.inactive]="!isColumnVisible(col.key)"
              (click)="toggleColumn(col.key)">
              {{ col.label }}
              <span class="chip-close">{{ isColumnVisible(col.key) ? '×' : '+' }}</span>
            </span>
          }
          <span class="chip toggle" (click)="showAllColumns()">
            <span class="material-icons-outlined" style="font-size:16px;">tune</span>
          </span>
        </div>
        <button class="btn-clear-filters" (click)="clearFilters()">
          <span class="material-icons-outlined" style="font-size:16px;">filter_list_off</span>
          Limpiar filtros
        </button>
      </div>

      <!-- Download link -->
      <div class="download-row">
        <a class="download-link">
          <span class="material-icons-outlined" style="font-size:16px;">download</span>
          Descargar tabla
        </a>
      </div>

      <!-- Loading -->
      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Cargando cursos...</p>
        </div>
      }

      <!-- Error -->
      @if (error()) {
        <div class="error-state">
          <span class="material-icons-outlined">error_outline</span>
          <p>{{ error() }}</p>
        </div>
      }

      <!-- Data table -->
      @if (!loading() && !error()) {
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                @if (isColumnVisible('title')) {
                  <th>
                    <div class="th-content" (click)="toggleSort('title')">
                      <span class="material-icons-outlined th-icon">filter_list</span>
                      Título
                      <span class="material-icons-outlined sort-icon">{{ getSortIcon('title') }}</span>
                    </div>
                  </th>
                }
                @if (isColumnVisible('category')) {
                  <th>
                    <div class="th-content" (click)="toggleSort('category')">
                      Categoría
                      <span class="material-icons-outlined sort-icon">{{ getSortIcon('category') }}</span>
                    </div>
                  </th>
                }
                @if (isColumnVisible('status')) {
                  <th>
                    <div class="th-content" (click)="toggleSort('status')">
                      <span class="material-icons-outlined th-icon">filter_list</span>
                      Estado
                      <span class="material-icons-outlined sort-icon">{{ getSortIcon('status') }}</span>
                    </div>
                  </th>
                }
                @if (isColumnVisible('lastModified')) {
                  <th>
                    <div class="th-content" (click)="toggleSort('lastModified')">
                      Última mod.
                      <span class="material-icons-outlined sort-icon">{{ getSortIcon('lastModified') }}</span>
                    </div>
                  </th>
                }
                @if (isColumnVisible('lastModifiedUser')) {
                  <th>
                    <div class="th-content">
                      <span class="material-icons-outlined th-icon">filter_list</span>
                      Usuario últ.mod.
                    </div>
                  </th>
                }
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (course of sortedCourses(); track course.id) {
                <tr>
                  @if (isColumnVisible('title')) {
                    <td class="td-title">{{ course.title }}</td>
                  }
                  @if (isColumnVisible('category')) {
                    <td>
                      <span class="badge-category" [class]="getCategoryClass(course.category)">
                        {{ course.category }}
                      </span>
                    </td>
                  }
                  @if (isColumnVisible('status')) {
                    <td>
                      <span class="badge-status" [class.active]="course.status === 'Activo'" [class.inactive-status]="course.status !== 'Activo'">
                        <span class="material-icons-outlined status-icon">{{ course.status === 'Activo' ? 'check_circle' : 'cancel' }}</span>
                        {{ course.status }}
                      </span>
                    </td>
                  }
                  @if (isColumnVisible('lastModified')) {
                    <td class="td-date">{{ course.lastModified }}</td>
                  }
                  @if (isColumnVisible('lastModifiedUser')) {
                    <td class="td-user">{{ course.lastModifiedUser }}</td>
                  }
                  <td class="td-actions">
                    <button class="action-btn edit">
                      <span class="material-icons-outlined">edit</span>
                    </button>
                    <button class="action-btn delete">
                      <span class="material-icons-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <span class="page-info">Mostrando 1 a {{ sortedCourses().length }} de {{ sortedCourses().length }} registros</span>
          <div class="page-controls">
            <button class="page-btn" disabled>«</button>
            <button class="page-btn" disabled>&lt;</button>
            <button class="page-btn active-page">1</button>
            <button class="page-btn" disabled>&gt;</button>
            <button class="page-btn" disabled>»</button>
            <select class="page-size">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .courses-page { }

    /* Breadcrumb */
    .breadcrumb {
      font-size: 0.75rem;
      color: #2e7d32;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0.3rem;
    }
    .breadcrumb a { color: #2e7d32; }
    .breadcrumb a:hover { text-decoration: underline; }
    .sep { margin: 0 0.4rem; color: #999; }
    .breadcrumb span:last-child { color: #666; font-weight: 400; }

    /* Title row */
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }
    .btn-create {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: #2e7d32;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-create:hover { background: #256029; }
    .btn-create span { font-size: 18px; }

    /* Column selector */
    .column-selector {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }
    .selector-label {
      font-size: 0.8rem;
      color: #666;
    }
    .chips {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.3rem 0.7rem;
      border-radius: 16px;
      font-size: 0.78rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }
    .chip.active {
      background: #e8f5e9;
      color: #2e7d32;
    }
    .chip.inactive {
      background: #f5f5f5;
      color: #999;
      text-decoration: line-through;
    }
    .chip:hover {
      transform: scale(1.03);
    }
    .chip-close {
      font-size: 0.9rem;
      opacity: 0.6;
      cursor: pointer;
      font-weight: 700;
    }
    .chip.toggle {
      background: #f0f0f0;
      color: #666;
      padding: 0.3rem 0.5rem;
    }
    .chip.toggle:hover {
      background: #e0e0e0;
    }
    .btn-clear-filters {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: #f5f5f5;
      color: #999;
      padding: 0.35rem 0.8rem;
      border-radius: 16px;
      font-size: 0.78rem;
      border: 1px solid #e0e0e0;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-clear-filters:hover { background: #eee; color: #666; }

    /* Download row */
    .download-row {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0.8rem;
    }
    .download-link {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      color: #2e7d32;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
    }
    .download-link:hover { text-decoration: underline; }

    /* Loading */
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem;
      color: #666;
    }
    .spinner {
      width: 36px;
      height: 36px;
      border: 3px solid #e0e0e0;
      border-top: 3px solid #2e7d32;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 1rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Error */
    .error-state {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 1rem 1.5rem;
      color: #dc2626;
    }

    /* TABLE */
    .table-wrapper {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table thead {
      background: #fafafa;
      border-bottom: 2px solid #e0e0e0;
    }
    .data-table th {
      padding: 0.7rem 1rem;
      text-align: left;
      font-size: 0.78rem;
      font-weight: 600;
      color: #555;
      white-space: nowrap;
    }
    .th-content {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      cursor: pointer;
      user-select: none;
      transition: color 0.15s;
    }
    .th-content:hover {
      color: #2e7d32;
    }
    .th-icon {
      font-size: 15px !important;
      color: #999;
    }
    .sort-icon {
      font-size: 16px !important;
      color: #bbb;
      cursor: pointer;
      transition: color 0.15s, transform 0.2s;
    }
    .th-content:hover .sort-icon {
      color: #2e7d32;
    }
    .data-table td {
      padding: 0.7rem 1rem;
      font-size: 0.85rem;
      border-bottom: 1px solid #f0f0f0;
      color: #333;
    }
    .data-table tbody tr {
      transition: background 0.15s;
    }
    .data-table tbody tr:hover {
      background: #fafffe;
    }
    .td-title {
      font-weight: 500;
      max-width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .td-date { color: #666; font-size: 0.82rem; white-space: nowrap; }
    .td-user { color: #666; }

    /* Category badges */
    .badge-category {
      display: inline-block;
      padding: 0.2rem 0.7rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }
    .badge-ingreso { background: #e8f5e9; color: #2e7d32; }
    .badge-sargento { background: #d7ccc8; color: #4e342e; }
    .badge-cabo { background: #263238; color: #fff; }
    .badge-qa { background: #fff8e1; color: #f57f17; }
    .badge-default { background: #f5f5f5; color: #666; }

    /* Status badge */
    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.82rem;
      font-weight: 500;
    }
    .badge-status.active { color: #2e7d32; }
    .badge-status.inactive-status { color: #c62828; }
    .status-icon { font-size: 16px !important; }

    /* Actions */
    .td-actions {
      display: flex;
      gap: 0.5rem;
    }
    .action-btn {
      background: none;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      transition: all 0.15s;
    }
    .action-btn span { font-size: 20px; }
    .action-btn.edit { color: #2e7d32; }
    .action-btn.edit:hover { background: #e8f5e9; }
    .action-btn.delete { color: #c62828; }
    .action-btn.delete:hover { background: #ffebee; }

    /* Pagination */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
      font-size: 0.82rem;
      color: #666;
    }
    .page-controls {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .page-btn {
      background: white;
      border: 1px solid #ddd;
      padding: 0.35rem 0.65rem;
      border-radius: 4px;
      font-size: 0.8rem;
      color: #333;
      min-width: 32px;
      text-align: center;
    }
    .page-btn:disabled { color: #ccc; cursor: default; }
    .page-btn.active-page {
      background: #2e7d32;
      color: white;
      border-color: #2e7d32;
    }
    .page-size {
      margin-left: 0.5rem;
      padding: 0.35rem 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.82rem;
      background: white;
    }
  `]
})
export class BoCoursesComponent implements OnInit {
  protected readonly courses = signal<Course[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  // Column definitions
  readonly columns: ColumnDef[] = [
    { key: 'title', label: 'Título', sortable: true, filterable: true },
    { key: 'category', label: 'Categoría', sortable: true, filterable: false },
    { key: 'status', label: 'Estado', sortable: true, filterable: true },
    { key: 'lastModified', label: 'Última mod.', sortable: true, filterable: false },
    { key: 'lastModifiedUser', label: 'Usuario últ.mod.', sortable: false, filterable: true }
  ];

  // Column visibility state
  protected readonly visibleColumns = signal<Record<string, boolean>>({
    title: true,
    category: true,
    status: true,
    lastModified: true,
    lastModifiedUser: true
  });

  // Sort state
  protected readonly sortColumn = signal<string>('');
  protected readonly sortDirection = signal<SortDirection>('none');

  // Computed sorted courses
  protected readonly sortedCourses = computed(() => {
    const data = [...this.courses()];
    const col = this.sortColumn();
    const dir = this.sortDirection();

    if (!col || dir === 'none') return data;

    return data.sort((a, b) => {
      const valA = (a as any)[col] ?? '';
      const valB = (b as any)[col] ?? '';

      let comparison: number;
      if (typeof valA === 'string') {
        comparison = valA.localeCompare(valB, 'es', { sensitivity: 'base' });
      } else {
        comparison = valA > valB ? 1 : valA < valB ? -1 : 0;
      }

      return dir === 'asc' ? comparison : -comparison;
    });
  });

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching courses', err);
        this.error.set('No se pudieron cargar los cursos. Verifica que los servicios estén activos.');
        this.loading.set(false);
      }
    });
  }

  // Column visibility
  isColumnVisible(key: string): boolean {
    return this.visibleColumns()[key] ?? true;
  }

  toggleColumn(key: string): void {
    this.visibleColumns.update(cols => ({
      ...cols,
      [key]: !cols[key]
    }));
  }

  showAllColumns(): void {
    const allVisible: Record<string, boolean> = {};
    this.columns.forEach(c => allVisible[c.key] = true);
    this.visibleColumns.set(allVisible);
  }

  // Sorting
  toggleSort(column: string): void {
    if (this.sortColumn() === column) {
      // Cycle: none -> asc -> desc -> none
      const dir = this.sortDirection();
      if (dir === 'none') {
        this.sortDirection.set('asc');
      } else if (dir === 'asc') {
        this.sortDirection.set('desc');
      } else {
        this.sortDirection.set('none');
        this.sortColumn.set('');
      }
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(column: string): string {
    if (this.sortColumn() !== column || this.sortDirection() === 'none') {
      return 'unfold_more';
    }
    return this.sortDirection() === 'asc' ? 'expand_less' : 'expand_more';
  }

  // Clear all filters
  clearFilters(): void {
    this.showAllColumns();
    this.sortColumn.set('');
    this.sortDirection.set('none');
  }

  getCategoryClass(category: string): string {
    const cat = category.toLowerCase();
    if (cat.includes('ingreso')) return 'badge-category badge-ingreso';
    if (cat.includes('sargento')) return 'badge-category badge-sargento';
    if (cat.includes('cabo')) return 'badge-category badge-cabo';
    if (cat.includes('qa') || cat.includes('categoría')) return 'badge-category badge-qa';
    return 'badge-category badge-default';
  }
}
