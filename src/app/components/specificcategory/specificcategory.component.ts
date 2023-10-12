import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Specificategory } from 'src/app/interfaces/specificategory';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-specificcategory',
  templateUrl: './specificcategory.component.html',
  styleUrls: ['./specificcategory.component.css'],
})
export class SpecificcategoryComponent {
  categoryDetails: Specificategory[] = [];
  constructor(
    private _categories: CategoriesService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    let id = this._ActivatedRoute.snapshot.params?.['id'];
    this._categories.getSpecificCategory(id).subscribe({
      next: (res) => {
        console.log(res);
        this.categoryDetails = res.data;
      },
    });
  }
}
