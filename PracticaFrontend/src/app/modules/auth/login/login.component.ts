import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader/loader.service';
import { ToasterService } from '../../../shared/services/toaster/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  invalido: boolean = false;
  passwordVisible: boolean = false;

  constructor
  (
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private loaderService: LoaderService,
    private toasterService: ToasterService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
        this.loaderService.hideLoader();
        this.toasterService.showError('Usuario o contraseña incorrecta')
        console.error('Login error:', error);
      }});
  }

  togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        if (passwordInput) {
            passwordInput.type = this.passwordVisible ? 'text' : 'password';
        }
  }
}
