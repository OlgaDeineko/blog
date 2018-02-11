import {Component} from '@angular/core';
import {ArticleService} from './services/article.service';

@Component({
  selector: 'ma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private $Article: ArticleService) {
    this.$Article.getAll();
  }
}
