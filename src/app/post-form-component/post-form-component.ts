import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../services/post-service';

@Component({
  selector: 'app-post-form-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form-component.html',
  styleUrls: ['./post-form-component.css'],
})

export class PostFormComponent {
  postForm: FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
    status: FormControl<'draft' | 'published'>;
    createdAt: FormControl<Date>;
  }>;

  // Indica si el formulario está en modo edición o creación
  isEditMode = false;
  // Almacena el ID de la publicación actual en caso de estar editando
  currentPostId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      title: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
      content: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      status: this.fb.control<'draft' | 'published'>('draft', { nonNullable: true }),
      createdAt: this.fb.control(new Date(), { nonNullable: true }),
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      if (!Number.isNaN(id)) {
        this.loadPostForEdit(id);
      }
    }
  }

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  // Carga los datos de la publicación a editar y los asigna al formulario
  private loadPostForEdit(id: number) {
    const post = this.postService.getPost(id);
    if (!post) {
      this.router.navigate(['/posts']);
      return;
    }

    this.isEditMode = true;
    this.currentPostId = post.id;
    this.postForm.patchValue({
      title: post.title,
      content: post.content,
      status: post.status,
      createdAt: post.createdAt,
    });
  }

  // Si el formulario no tiene un createdAt válido, se asigna la fecha actual
  private refreshCreatedAtIfNew() {
    if (!this.isEditMode) {
      this.postForm.patchValue({ createdAt: new Date() });
    }
  }

  private buildPostData(): Omit<Post, 'id'> {
    return this.postForm.getRawValue();
  }

  // Guarda la publicación como borrador o actualiza el borrador existente
  saveDraft() {
    this.refreshCreatedAtIfNew();
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.postForm.patchValue({ status: 'draft' });
    const postData = this.buildPostData();

    if (this.isEditMode && this.currentPostId != null) {
      this.postService.updatePost(this.currentPostId, postData);
      window.alert('Borrador actualizado');
    } else {
      this.postService.createPost(postData);
      window.alert('Publicación guardada como borrador');
    }

    this.router.navigate(['/posts']);
  }

  // Publica la publicación o actualiza la publicación existente
  publish() {
    this.refreshCreatedAtIfNew();
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.postForm.patchValue({ status: 'published' });
    const postData = this.buildPostData();

    if (this.isEditMode && this.currentPostId != null) {
      this.postService.updatePost(this.currentPostId, postData);
      window.alert('Publicación actualizada');
    } else {
      this.postService.createPost(postData);
      window.alert('Publicación guardada y publicada');
    }

    this.router.navigate(['/posts']);
  }
}
