import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  getUser(): string {
    return localStorage.getItem('currentUser')
  };

  isLogin(): boolean {
    return !!this.getUser();
  };

  login(email: string, password: string) {
    return this.http.post<any>('/api/authenticate', {email: email, password: password})
      .map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}