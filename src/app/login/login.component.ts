import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
   
    const { username, password } = this.loginForm.value;
console.log("username")
    this.authService.login(username, password)
      .subscribe(
        (response) => {
          console.log("hii");
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
  }
}
