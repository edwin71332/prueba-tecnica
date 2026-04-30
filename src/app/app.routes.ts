import { Routes } from '@angular/router';
import { PostListComponent } from './Post-List-Component/post-list-component';
import { PostFormComponent } from './post-form-component/post-form-component';
import { richMortyComponent } from './rick-morty-component/rich-morty.component';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/new', component: PostFormComponent },
  { path: 'posts/:id', component: PostFormComponent },
  { path: 'rick-morty', component: richMortyComponent },
  { path: 'rick-morty/:id', component: richMortyComponent },
];
