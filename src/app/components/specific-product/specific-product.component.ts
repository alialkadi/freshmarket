import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { product } from 'src/app/interfaces/allproducts';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css'],
})
export class SpecificProductComponent implements OnInit {
  productDetails!: product;
  customOptions: OwlOptions = {
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
    },
    nav: true,
  };
  showSuccess() {
      this.toastr.success('product Added successfully');
    }
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _AuthenticationService: AuthenticationService
    
  ) {}
  ngOnInit(): void {
    let id = this._ActivatedRoute.snapshot.params?.['id'];
    this._ProductsService.getSpecificProduct(id).subscribe({
      next: (req) => {
        console.log(req);
        this.productDetails = req.data;
      },
    });
  }
  addProduct(id: any) {
    this._CartService.addproduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.itemsCountInCart.next(res.numOfCartItems);
        console.log(this._CartService.itemsCountInCart);
        this.showSuccess();
      },
      error: (err) => {
        console.log(err.error.message);

        if (err.error.message == 'Invalid Token. please login again') {
          this._AuthenticationService.logOut();
        }
      },
    });
  }
}
