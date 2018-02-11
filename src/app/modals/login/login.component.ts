import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EMAIL_PATTERN, PASSWORD_PATTERN} from '../../constants';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToasterService} from 'angular2-toaster';


@Component({
  selector: 'ma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  private toasterService: ToasterService;

  constructor(public $ActiveModal: NgbActiveModal,
              private route: ActivatedRoute,
              toasterService: ToasterService,
              private router: Router,
              private $Auth: AuthService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.$Auth.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login() {
    this.loading = true;
    console.log(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password.toString())
    this.$Auth.login(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password)
      .subscribe(
        data => {
          if (this.$ActiveModal) {
            this.$ActiveModal.close();
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.toasterService.pop('error', ` ${error}`);
          this.loading = false;
        });
  }

  gotoregistration() {
    this.$ActiveModal.close();
    this.router.navigate(['/registration']);
  }
}
