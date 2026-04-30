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
  private posts: Post[] = [];
  private readonly STORAGE_KEY = 'posts';

  constructor() {
    this.loadPostsFromStorage();
  }

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
    this.savePostsToStorage();
  }

  // Actualizar una publicación existente
  updatePost(id: number, updatedPost: Partial<Post>): void {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      return;
    }
    this.posts[index] = { ...this.posts[index], ...updatedPost };
    this.savePostsToStorage();
  }

  // Eliminar una publicación
  deletePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
    this.savePostsToStorage();
  }

  // Generar un nuevo ID para una publicación 
  private generateId(): number {
    return this.posts.length ? Math.max(...this.posts.map(post => post.id)) + 1 : 1;
  }

  // Cargar posts desde localStorage
  private loadPostsFromStorage(): void {
    const storedPosts = localStorage.getItem(this.STORAGE_KEY);
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        this.posts = parsedPosts.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
        }));
      } catch (error) {
        console.error('Error loading posts from localStorage:', error);
        this.posts = [];
      }
    } else {
      // Si no hay datos, inicializar con datos de ejemplo
      this.posts = [
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
      this.savePostsToStorage();
    }
  }

  // Guardar posts en localStorage
  private savePostsToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.posts));
    } catch (error) {
      console.error('Error saving posts to localStorage:', error);
    }
  }
}
