import { Categories } from './../../interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  id: any = '6439d61c0049ad0b52b90051';
  allCategories: Categories[] = [];
  constructor(private _categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.allCategories = res.data;
      },
    });
  }
}
