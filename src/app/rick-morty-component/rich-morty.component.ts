import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RickMortyService, Character } from '../services/rick-morty.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-rick-morty',
    standalone: true,
    imports: [RouterModule, AsyncPipe],
    templateUrl: './rich-morty.component.html',
    styleUrls: ['./rich-morty.component.css']
})
export class richMortyComponent implements OnInit {

    public characters$!: Observable<Character[]>;
    public character$: Observable<Character> | null = null;

    constructor(private rickMortyService: RickMortyService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.character$ = this.rickMortyService.getCharacter(+id);
            } else {
                this.characters$ = this.rickMortyService.getCharacters();
            }
        });
    }
}
