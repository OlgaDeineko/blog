import {Injectable} from '@angular/core';
import {IUser} from '../interfaces/i-user';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  create(user: IUser) {
    return this.http.post('/api/users', user);
  }
}
