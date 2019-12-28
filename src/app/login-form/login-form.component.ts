import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../security/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed = false;
  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLoginSubmit() {
    this.loginFailed = false;
    this.authenticationService.logIn(this.loginForm.value).subscribe(() => {this.router.navigateByUrl("/agreementList")}, (error) => this.loginFailed = true)
  }

}
