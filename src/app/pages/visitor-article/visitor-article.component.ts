import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute} from '@angular/router';
import {AnonymousSubscription} from 'rxjs/Subscription';
import {IArticle} from '../../interfaces/i-article';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../../modals/login/login.component';
import {FormControl, FormGroup} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ma-visitor-article',
  templateUrl: './visitor-article.component.html',
  styleUrls: ['./visitor-article.component.scss']
})
export class VisitorArticleComponent implements OnInit, OnDestroy {
  article: IArticle;
  articles: IArticle[];
  addCommentForm: FormGroup;
  private toasterService: ToasterService;

  private _articlesSub: AnonymousSubscription;
  private _routeSub: AnonymousSubscription;


  constructor(private $Route: ActivatedRoute,
              private $Article: ArticleService,
              public $Auth: AuthService,
              toasterService: ToasterService,
              private $Modal: NgbModal) {
    this.$Article.getAll();
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this._articlesSub = this.$Article.articles.subscribe(
      (articles) => {
        this.articles = articles;
      });

    this._routeSub = this.$Route.paramMap
      .subscribe(params => {
        this.$Article.getArticle(params.get('id')).then((res) => {
          this.article = res[0];
          this.$Article.getCommentsByPostId(this.article.id).then((comments) => {
            this.article.comments = comments;
          })
        })
      });
    this.addCommentForm = new FormGroup({
      body: new FormControl(''),
      author: new FormControl(''),
    });
  }

  login() {
    this.$Modal.open(LoginComponent);
  }

  logout() {
    this.$Auth.logout();
  }

  submit() {
    if (!this.addCommentForm.getRawValue().body) {
      this.toasterService.pop('error', `The comment can't be blank!`);
      return;
    }
    if (!this.addCommentForm.getRawValue().author) {
      this.toasterService.pop('error', `The author can't be blank!`);
      return;
    }
    let commentData = this.addCommentForm.getRawValue();
    commentData.id = this.getRandomInt(this.articles.length, 1000);
    commentData.postId = this.article.id;
    this.$Article.saveComment(commentData).then(() => {
      this.toasterService.pop('success', ` The comment created successfully!`);
      this.$Article.getCommentsByPostId(this.article.id).then((comments) => {
        this.article.comments = comments;
        this.addCommentForm.reset();
      })
    })
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  ngOnDestroy() {
    this._routeSub.unsubscribe();
    this._articlesSub.unsubscribe();
  }

}
