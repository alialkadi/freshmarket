import { Brands } from 'src/app/interfaces/brands';
import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/interfaces/allproducts';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  allBrands:any
  constructor(private _BrandsService: BrandsService) { }
 
  brandDetails: any;

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
        console.log(this.allBrands);
      }
    });
    

  }
}

