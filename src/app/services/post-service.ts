import { Injectable } from '@angular/core';

export interface Post {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Primera publicación',
      content: 'Contenido de ejemplo',
      status: 'published',
      createdAt: new Date('2023-01-01'),
    },
    {
      id: 2,
      title: 'Borrador de prueba',
      content: 'Otro contenido',
      status: 'draft',
      createdAt: new Date('2023-01-02'),
    },
  ];

  // Obtener todas las publicaciones
  getPosts(): Post[] {
    return this.posts;
  }

  // Obtener una publicación por ID
  getPost(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  // Crear una nueva publicación
  createPost(post: Omit<Post, 'id'>): void {
    const newPost: Post = {
      id: this.generateId(),
      ...post,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
  }

  // Actualizar una publicación existente
  updatePost(id: number, updatedPost: Partial<Post>): void {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      return;
    }
    this.posts[index] = { ...this.posts[index], ...updatedPost };
  }

  // Eliminar una publicación
  deletePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  // Generar un nuevo ID para una publicación 
  private generateId(): number {
    return this.posts.length ? Math.max(...this.posts.map(post => post.id)) + 1 : 1;
  }
}
