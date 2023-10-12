import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from 'src/app/interfaces/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-sliders-categories',
  templateUrl: './sliders-categories.component.html',
  styleUrls: ['./sliders-categories.component.css'],
})
export class SlidersCategoriesComponent implements OnInit {
  categories: Categories[] = [];
  CategoryCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  constructor(private _CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe((res) => {
      console.log(res.data);
      this.categories = res.data;
    });
  }
}
