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
  statusFilter: 'all' | 'draft' | 'published' = 'all';

  constructor(private postService: PostService) {
    this.loadPosts();
  }

  // Cargar las publicaciones al iniciar el componente
  loadPosts(): void {
    this.posts = this.postService.getPosts();
  }

  // Filtrar las publicaciones por estado
  filterPosts(): Post[] {
    if (this.statusFilter === 'all') {
      return this.posts;
    }
    return this.posts.filter(post => post.status === this.statusFilter);
  }

  // Cambiar el filtro de estado
  setFilter(filter: 'all' | 'draft' | 'published') {
    this.statusFilter = filter;
  }

  // Eliminar una publicación
  deletePost(id: number): void {
    if (!window.confirm('¿Eliminar esta publicación?')) {
      return;
    }

    this.postService.deletePost(id);
    this.loadPosts();
  }

  // Manejar el cambio en el filtro de estado
  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.statusFilter = selectElement.value as 'all' | 'draft' | 'published';
    this.applyFilter();
  }

  applyFilter(): void {
    const allPosts = this.postService.getPosts();

    if (this.statusFilter === 'all') {
      this.posts = allPosts;
    } else {
      this.posts = allPosts.filter(post => post.status === this.statusFilter);
    }
  }

}
