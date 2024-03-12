import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
      this.registerForm = this._formBuilder.group({

      });
  }

  onSubmit(): void {

  }
}
