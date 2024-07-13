import { Routes } from '@angular/router';
import { SearchPagesComponent } from './pages/search-pages/search-pages.component';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { ProfilePagesComponent } from './pages/profile-pages/profile-pages.component';
import { LayoutComponent } from './common-ui/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SearchPagesComponent },
      { path: 'profile', component: ProfilePagesComponent },
    ],
  },

  { path: 'login', component: LoginPagesComponent },
];
