import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnonymousSubscription} from 'rxjs/Subscription';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {AuthService} from '../../services/auth.service';
import {IArticle} from '../../interfaces/i-article';

@Component({
  selector: 'ma-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit, OnDestroy {
  article: any;
  articles: IArticle[];
  mode: string;
  private toasterService: ToasterService;
  private _routeSub: AnonymousSubscription;
  private _routeDataSub: AnonymousSubscription;
  private _articlesSub: AnonymousSubscription;

  tinymceOptions = {
    themes: 'modern',
    branding: false,
    height: 350,
    resize: false,
    language_url: `/assets/i18n/tinyMCE/en.js`,
    language: 'en',
    plugins: [
      'advlist autolink lists link charmap print preview hr anchor pagebreak',
      'searchreplace visualblocks visualchars code fullscreen',
      'insertdatetime nonbreaking save table contextmenu directionality',
      'emoticons template paste textcolor colorpicker textpattern codesample toc'
    ],
    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  | forecolor backcolor emoticons | codesample | code',
    paste_data_images: false,
  };

  constructor(private $Route: ActivatedRoute,
              private $Router: Router,
              private $Article: ArticleService,
              private $Auth: AuthService,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.mode = 'create';
    this._routeDataSub = this.$Route.data.subscribe(res => {
      if (res.name === 'edit') {
        this.mode = 'update';
      }
    });
    this._articlesSub = this.$Article.articles.subscribe(
      (articles) => {
        this.articles = articles;
      }
    );
    if (this.mode === 'update') {
      this._routeSub = this.$Route.paramMap
        .subscribe(params => {
          this.$Article.getArticle(params.get('id')).then((res) => {
            this.article = res[0];
          })
        });
    } else {
      this.article = {};
    }

  }

  logout() {
    this.$Auth.logout();
  }

  goback() {
    this.$Router.navigate(['/admin/dashboard']);
  }

  save() {
    if (!this.article.title) {
      this.toasterService.pop('error', `The title can't be blank!`);
      return;
    }
    if (!this.article.text) {
      this.toasterService.pop('error', `The article can't be blank!`);
      return;
    }
    let dt = new Date();
    this.article.id = this.getRandomInt(this.articles.length, 1000);
    this.article.postDate = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.article.author = currentUser.firstName + ' ' + currentUser.lastName;
    this.$Article.addArticle(this.article).then((res) => {
      this.toasterService.pop('success', ` The article created successfully!`);
      this.$Router.navigate(['/admin/dashboard']);
    })
  }

  update() {
    this.$Article.editArticle(this.article).then((res) => {
      this.toasterService.pop('success', ` The article updated successfully!`);
      this.$Router.navigate(['/admin/dashboard']);
    })
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  ngOnDestroy() {
    if (this._routeSub) {
      this._routeSub.unsubscribe();
    }
    this._routeDataSub.unsubscribe();
    if (this._articlesSub) {
      this._articlesSub.unsubscribe();
    }
  }
}
