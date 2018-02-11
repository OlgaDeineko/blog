import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthorizedGuard} from './guards/authorized.guard';

import {LoginComponent} from './modals/login/login.component';
import {EditArticleComponent} from './pages/edit-article/edit-article.component';
import {VisitorComponent} from './pages/visitor/visitor.component';
import {VisitorArticleComponent} from './pages/visitor-article/visitor-article.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {RegistrationComponent} from './pages/registration/registration.component';

export let routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: VisitorComponent,
    data: {
      name: 'home'
    }
    },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      name: 'login'
    }
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: {
      name: 'registration'
    }
  },
  {
    path: 'article/:id',
    component: VisitorArticleComponent,
    data: {
      name: 'article'
    }
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        component: AdminPanelComponent,
        canActivate: [AuthorizedGuard],
        data: {
          name: 'dashboard',
          redirectTo: '/login'
        }
      },
      {
        path: 'edit/:id',
        component: EditArticleComponent,
        canActivate: [AuthorizedGuard],
        data: {
          name: 'edit',
          redirectTo: '/login'
        }
      },
      {
        path: 'create',
        component: EditArticleComponent,
        canActivate: [AuthorizedGuard],
        data: {
          name: 'create',
          redirectTo: '/login'
        }
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/404'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthorizedGuard,
  ]
})
export class AppRoutingModule {
}
