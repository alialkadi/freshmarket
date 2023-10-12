import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/interfaces/allproducts';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: product[] = [];
  searchItem: string = '';
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _AuthenticationService: AuthenticationService,
    private _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (responce) => {
        console.log(responce);
        this.products = responce.data;
        console.log(this.products);
      },
    });
  }
  showSuccess() {
    this.toastr.success('product Added To WishList');
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
  addWishItem(id: any) {
    this._WishlistService.addProductToWish(id).subscribe({
      next: (res) => {
        console.log(res);
        this._WishlistService.itemsCountInWishList.next(res.count);
        this.showSuccess();
      },
    });
  }
}
