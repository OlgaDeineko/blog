import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorArticleComponent } from './visitor-article.component';

describe('VisitorArticleComponent', () => {
  let component: VisitorArticleComponent;
  let fixture: ComponentFixture<VisitorArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
