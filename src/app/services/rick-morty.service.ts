import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
}

@Injectable({
    providedIn: 'root',
})
export class RickMortyService {

    private apiurl = 'https://rickandmortyapi.com/api/character';

    constructor(private http: HttpClient) { }

    getCharacters(): Observable<Character[]> {
        return this.http.get<{ results: Character[] }>(this.apiurl).pipe(
            map(response => response.results)
        );
    }

    getCharacter(id: number): Observable<Character> {
        return this.http.get<Character>(`${this.apiurl}/${id}`);
    }
}
