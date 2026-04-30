import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post-service';

@Component({
  selector: 'app-post-form-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form-component.html',
  styleUrls: ['./post-form-component.css'],
})

export class PostFormComponent {

  // Definir el formulario reactivo con tipado estricto
  postForm: FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
    status: FormControl<'draft' | 'published'>;
    createdAt: FormControl<Date>;
  }>;

  constructor(private fb: FormBuilder, private router: Router, private postService: PostService) {
    this.postForm = this.fb.group({
      title: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
      content: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      status: this.fb.control<'draft' | 'published'>('draft', { nonNullable: true }),
      createdAt: this.fb.control(new Date(), { nonNullable: true }),
    });
  }


  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  // Actualizar la fecha de creación cada vez que se guarda o publica
  private updateCreatedAt() {
    this.postForm.patchValue({ createdAt: new Date() });
  }

  saveDraft() {  // Guardar como borrador
    this.updateCreatedAt();
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    this.postForm.patchValue({ status: 'draft' });
    const postData = this.postForm.getRawValue();
    this.postService.createPost(postData);
    window.alert('Publicación guardada como borrador');
    this.router.navigate(['/posts']);
  }

  publish() { // Publicar la publicación
    this.updateCreatedAt();
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    this.postForm.patchValue({ status: 'published' });
    const postData = this.postForm.getRawValue();
    this.postService.createPost(postData);
    window.alert('Publicación guardada y publicada');
    this.router.navigate(['/posts']);
  }
}
