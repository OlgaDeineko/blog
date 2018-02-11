import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule} from 'angular2-toaster';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
// pages
import {RegistrationComponent} from './pages/registration/registration.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {EditArticleComponent} from './pages/edit-article/edit-article.component';
import {VisitorComponent} from './pages/visitor/visitor.component';
import {VisitorArticleComponent} from './pages/visitor-article/visitor-article.component';
// common modules
import {FormInputComponent} from './components/form-input/form-input.component';
import {TinyMceComponent} from './components/tiny-mce/tiny-mce.component';
// modals
import {LoginComponent} from './modals/login/login.component';
import {ConfirmModalComponent} from './modals/confirm-modal/confirm-modal.component';
// services
import {RegistrationService} from './services/registration.service';
import {ArticleService} from './services/article.service';
import {AuthService} from './services/auth.service';
// directives
import {ConfirmWindowDirective} from './directives/confirm-window.directive';
// helpers
import {fakeBackendProvider} from './helpers/fake-backend';
import {JwtInterceptor} from './helpers/jwt-inspector';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AdminPanelComponent,
    EditArticleComponent,
    VisitorComponent,
    TinyMceComponent,
    VisitorArticleComponent,
    FormInputComponent,
    ConfirmModalComponent,
    ConfirmWindowDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ToasterModule,
  ],
  exports: [
    TinyMceComponent,
  ],
  providers: [
    ArticleService,
    AuthService,
    RegistrationService,
    NgbActiveModal,
    fakeBackendProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  entryComponents: [
    LoginComponent,
    ConfirmModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
