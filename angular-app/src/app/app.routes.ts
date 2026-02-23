import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'backoffice',
        loadComponent: () => import('./components/backoffice/bo-layout.component').then(m => m.BoLayoutComponent),
        children: [
            {
                path: 'cursos',
                loadComponent: () => import('./components/backoffice/bo-courses.component').then(m => m.BoCoursesComponent)
            },
            {
                path: '',
                redirectTo: 'cursos',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'aula-virtual',
        loadComponent: () => import('./components/aula-virtual/av-layout.component').then(m => m.AvLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./components/aula-virtual/av-dashboard.component').then(m => m.AvDashboardComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
