import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {AnonymousSubscription} from 'rxjs/Subscription';
import {IArticle} from '../../interfaces/i-article';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../../modals/login/login.component';

@Component({
  selector: 'ma-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit, OnDestroy {
  articles: IArticle[];
  private _articlesSub: AnonymousSubscription;

  constructor(private $Article: ArticleService,
              public $Auth: AuthService,
              private $Modal: NgbModal) {
  }

  ngOnInit() {
    this._articlesSub = this.$Article.articles.subscribe(
      (articles) => {
        this.articles = articles;
        this.articles.forEach((a) => {
          this.$Article.getCommentsByPostId(a.id).then((comments) => {
            a.comments = comments;
          })
        });
      }
    );
  }

  login() {
    this.$Modal.open(LoginComponent);
  }

  logout() {
    this.$Auth.logout();
  }

  ngOnDestroy() {
    this._articlesSub.unsubscribe();
  }

}
