import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IArticle} from '../interfaces/i-article';
import 'rxjs/add/operator/map';
import {IComment} from '../interfaces/i-comment';

@Injectable()
export class ArticleService {

  private _articles: BehaviorSubject<IArticle[]>;

  constructor(private $http: Http) {
    this._articles = new BehaviorSubject([]);
  }

  get articles(): BehaviorSubject<IArticle[]> {
    return this._articles;
  }

  getAll() {
    this.$http.get(`https://blogbackend.herokuapp.com/get`)
      .map(res => res.json() as Array<IArticle>)
      .subscribe((result) => {
        this._articles.next(result);
        return result
      });
  }

  getArticle(id: string) {
    return this.$http.get(`https://blogbackend.herokuapp.com/get/${id}`)
      .map(res => res.json() as Array<IArticle>)
      .toPromise()
      .then((result) => {
        return result
      });
  }

  addArticle(item: IArticle) {
    return this.$http.post(`https://blogbackend.herokuapp.com/create`, item)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.getAll();
        return res;
      });
  }

  editArticle(item: IArticle) {
    return this.$http.put(`https://blogbackend.herokuapp.com/update`, item)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.getAll();
        return res;
      });
  }

  removeArticle(id: string) {
    return this.$http.delete(`https://blogbackend.herokuapp.com/delete/${id}`)
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        this.getAll();
        return res;
      });
  };

  getCommentsByPostId(id: string) {
    return this.$http.get(`https://blogbackend.herokuapp.com/comment/${id}`)
      .map(res => res.json())
      .toPromise()
      .then((result) => {
        return result
      });
  }

  saveComment(comment: IComment) {
    return this.$http.post(`https://blogbackend.herokuapp.com/comment`, comment)
      .map(res => res.json())
      .toPromise()
  }
}
