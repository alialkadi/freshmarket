import { WishlistService } from 'src/app/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit{
  wishListData: any;
  emptyMessage: boolean = true;
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
  constructor(private _wishlistservice: WishlistService,private toastrService:ToastrService) {

    
  }
  ngOnInit(): void {
    this._wishlistservice.getWishList().subscribe({
      next: (res) => {
        this._wishlistservice.itemsCountInWishList.next(res.count);
        this.wishListData = res.data;
        console.log(res);
        console.log(res.data.images);
      }
    })
  }
  getdata() {
    this._wishlistservice.getWishList().subscribe({
      next: (res) => {
        this._wishlistservice.itemsCountInWishList.next(res.count);
        this.wishListData = res.data;
        console.log(res);
        console.log(res.data.images);
      }
    })
    
  }
  deleteFromWish(id: any) {
    this._wishlistservice.removeFromWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        // this.wishListData = res.data;
        // this._wishlistservice.itemsCountInWishList.next(res.count);
        this.getdata();
        this.toastrService.error("deleted");
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
