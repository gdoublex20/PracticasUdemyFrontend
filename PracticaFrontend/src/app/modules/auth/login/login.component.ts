import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login() {
    this.loaderService.showLoader();
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe({next: response => {
        // manejar la respuesta del inicio de sesión según lo necesites
        console.log('Login successful');
        this.loaderService.hideLoader(2000);

        this.router.navigate([''])
        
        
      }, error: error => {
        // manejar errores de inicio de sesión
        console.error('Login error:', error);
      }});
  }
}
