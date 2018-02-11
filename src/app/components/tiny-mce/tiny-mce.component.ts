import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Editor } from 'tinymce';
import {IMaWindow} from '../../interfaces/i-ma-window';

@Component({
  selector: 'ma-tiny-mce',
  templateUrl: './tiny-mce.component.html',
  styleUrls: ['./tiny-mce.component.scss']
})
export class TinyMceComponent implements OnDestroy, AfterViewInit {

  @ViewChild('faqTinyMce') faqTinyMce: ElementRef;

  @Input('options') options?: any;
  @Input('model') model: string;
  @Output('modelChange') modelChange: EventEmitter<string> = new EventEmitter<string>();

  editor: Editor;

  constructor() {
  }

  ngAfterViewInit() {
    (window as IMaWindow).tinymce.baseURL = '/assets/tinyMCE';
    (window as IMaWindow).tinymce.init({
      target: this.faqTinyMce.nativeElement,
      baseURL: '/assets/tinyMCE/',
      skin_url: '/assets/tinyMCE/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('change', () => {
          this.modelChange.emit(editor.getContent());
        });
      },
      ...this.options,
    });
  }


  ngOnDestroy() {
    if (this.editor) {
      (window as IMaWindow).tinymce.remove(this.editor);
    }
  }

}
