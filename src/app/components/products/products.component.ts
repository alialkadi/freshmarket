import { WishlistService } from './../../services/wishlist.service';
import { AuthenticationService } from './../../services/authentication.service';
import { product } from 'src/app/interfaces/allproducts';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  currentpage: any;
  pageSize: any;
  total: any;
  productDetails!: product;
  id: any;
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
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _AuthenticationService: AuthenticationService,
    private _WishlistService: WishlistService,
    private _ActivatedRoute: ActivatedRoute,
    private _Renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    this._ProductsService.getProducts(this.currentpage).subscribe({
      next: (responce) => {
        console.log(responce);
        this.products = responce.data;
        this.id = responce.data._id;
        this.pageSize = responce.metadata.limit;
        this.currentpage = responce.metadata.currentPage;
        this.total = responce.results;
      },
    });
    // let id = this._ActivatedRoute.snapshot.params?.['id'];
  }

  showSuccess(msg: any) {
    this.toastr.success(msg, 'Product', {
      closeButton: true,
    });
  }
  addProduct(id: any, element: HTMLButtonElement) {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addproduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.itemsCountInCart.next(res.numOfCartItems);
        console.log(this._CartService.itemsCountInCart);
        this.showSuccess('product Added To Cart');
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        console.log(err.error.message);

        if (err.error.message == 'Invalid Token. please login again') {
          this._AuthenticationService.logOut();
        }
      },
    });
  }
  addWishItem(id: any, element: HTMLButtonElement) {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._WishlistService.addProductToWish(id).subscribe({
      next: (res) => {
        console.log(res);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._Renderer2.addClass(element, 'text-danger');
        this._WishlistService.itemsCountInWishList.next(res.count);
        this.showSuccess('product Added To WishList');
      },
      error: (err) => {
        console.log(err.error.message);

        if (err.error.message == 'Invalid Token. please login again') {
          this._AuthenticationService.logOut();
        }
      },
    });
  }
  pageChanged(event: any) {
    console.log(event);
    this._ProductsService.getProducts(event).subscribe({
      next: (responce) => {
        console.log(responce);
        this.products = responce.data;
        this.id = responce.data._id;
        this.pageSize = responce.metadata.limit;
        this.currentpage = responce.metadata.currentPage;
        this.total = responce.results;
      },
    });
  }
}
