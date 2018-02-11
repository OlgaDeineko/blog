import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'ma-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input('form') form?: FormGroup;
  @Input('formElement') formElement?: FormGroupDirective;
  @Input('name') name: string;
  @Input('label') label?: string;
  @Input('placeholder') placeholder?: string;
  @Input('type') type? = 'text';
  @Input('disabled') disabled?: boolean | null = null;
  @Input('id') id?: string;
  @Input('addon') addon?: string = null;
 message: string = '';
  constructor() {
  }

  ngOnInit() {
    if (!this.form && this.formElement) {
      this.form = this.formElement.form;
    }

    this.disabled = this.disabled ? true : null;

    this.placeholder = this.placeholder || this.label || this.name;

    this.id = this.id || this.name;
  }

  checkError(){
    console.log(this.form.controls[this.name].errors)
    if(this.form.controls[this.name].errors) {
      let keys = Object.keys(this.form.controls[this.name].errors);

      switch (keys[0]) {
        case 'required':
          this.message = `${this.name} is required`;
          break;
        case 'maxlength':
          this.message = `String is too long (${this.form.controls[this.name].errors.maxlength.actualLength} characters), maximum ${this.form.controls[this.name].errors.maxlength.requiredLength}`;
          break;
        case 'minlength':
          this.message = `String is too short (${this.form.controls[this.name].errors.minlength.actualLength} characters), minimum ${this.form.controls[this.name].errors.minlength.requiredLength}`;
          break;
        case 'email':
          this.message = 'Invalid email address';
          break;
        default:
          return
      }
    }
  }

}