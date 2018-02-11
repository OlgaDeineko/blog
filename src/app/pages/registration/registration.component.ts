import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginComponent} from '../../modals/login/login.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EMAIL_PATTERN, PASSWORD_PATTERN} from '../../constants';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {RegistrationService} from '../../services/registration.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ma-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrForm: FormGroup;
  loading = false;
  private toasterService: ToasterService;

  constructor(public $Registr: RegistrationService,
              private router: Router,
              public $Auth: AuthService,
              toasterService: ToasterService,
              private $Modal: NgbModal) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.registrForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.required,
      ]),
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

  register() {
    this.loading = true;
    this.$Registr.create(this.registrForm.getRawValue())
      .subscribe(
        data => {
          this.toasterService.pop('success', ` Registration successful`);
          this.router.navigate(['/login']);
        },
        error => {
          this.toasterService.pop('error', ` ${error}`);
          this.loading = false;
        });
  }

  login() {
    this.$Modal.open(LoginComponent);
  }

  logout() {
    this.$Auth.logout();
  }
}
