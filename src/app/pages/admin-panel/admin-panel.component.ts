import {Component, OnDestroy, OnInit} from '@angular/core';
import {IArticle} from '../../interfaces/i-article';
import {AnonymousSubscription} from 'rxjs/Subscription';
import {ArticleService} from '../../services/article.service';
import {ToasterService} from 'angular2-toaster';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ma-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  articles: IArticle[];
  searchModel = '';
  articleResults: IArticle[];

  private toasterService: ToasterService;
  private _articlesSub: AnonymousSubscription;

  constructor(private $Article: ArticleService,
              private $Auth: AuthService,
              private $Router: Router,
              toasterService: ToasterService,) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this._articlesSub = this.$Article.articles.subscribe(
      (articles) => {
        this.articles = articles;
      }
    );

  }

  logout() {
    this.$Auth.logout();
    this.$Router.navigate(['/home']);
  }

  remove(id) {
    this.$Article.removeArticle(id).then((res) => {
      this.toasterService.pop('success', ` The article removed successfully!`);
    })
  }

  search() {
    this.articleResults = this.articles
      .filter(a => a.title.search(this.searchModel.trim()) !== -1)
  }

  ngOnDestroy() {
    this._articlesSub.unsubscribe();
  }

}
