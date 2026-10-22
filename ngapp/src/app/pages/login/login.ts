
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';

  onSubmit(form: NgForm): void {
  this.successMessage = '';

  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

  this.successMessage =
    'Formulaire validé avec succès (démonstration uniquement).';

  form.resetForm();
}
}
