import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { PostService, Post } from '../services/post-service';
import { routes } from '../app.routes';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list-component.html',
  styleUrls: ['./post-list-component.css'],
})
export class PostListComponent {
  posts: Post[] = [];

  constructor(private postService: PostService) {
    this.loadPosts();
  }

  // Cargar las publicaciones al iniciar el componente
  loadPosts(): void {
    this.posts = this.postService.getPosts();
  }

  // Eliminar una publicación
  deletePost(id: number): void {
    if (!window.confirm('¿Eliminar esta publicación?')) {
      return;
    }

    this.postService.deletePost(id);
    this.loadPosts();
  }

}
