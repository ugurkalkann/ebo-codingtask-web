import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderProductDetail, OrderProductRequest, Product } from 'src/app/_model/Product';
import { ProductService } from 'src/app/_services/product.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number;
  currentProduct: Product;
  productOrderHistory: OrderProductDetail[];
  orderHistoryVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, public storageService: StorageService) {
    this.productId = this.route.snapshot.params.id; 
  }

  ngOnInit(): void {
    if(this.productId){
      this.productService.getProduct(this.productId).subscribe(
        data => {
          this.currentProduct = data;
        },
        err => {
          console.log(err);
          $("#modalBody").html('There is an error while displayin product detail. Check logs for more info');
          $('#infoModal').modal('toggle');
        }
      );
    }
  }

  orderProduct(): void {
    let orderProductRequest: OrderProductRequest = {
      ProductID: this.currentProduct.ProductID,
      UserID: this.storageService.getUser().UserID!,
    };
    this.productService.orderProduct(orderProductRequest).subscribe(
      data => {
        this.currentProduct = data;
        $("#modalBody").html('You just bought the ' + this.currentProduct.Name);
        $('#infoModal').modal('toggle');
        this.orderHistoryVisible = false;
      },
      err => {
        console.log(err);
        if(err && err.status === 401){
          $("#modalBody").html('Unauthorized access. Please log in.');
          $('#infoModal').modal('toggle');
          
          this.storageService.logOut();
          this.router.navigate(['/login']);
        }else{
          $("#modalBody").html('There is an error while ordering the product. Check logs for more info');
          $('#infoModal').modal('toggle');
        }
      }
    );
  }

  getProductOrderHistory(): void {
    if(this.orderHistoryVisible){
      this.orderHistoryVisible = false;
    }else{
      this.productService.getProductOrderHistory(this.currentProduct.ProductID).subscribe(
        data => {
          this.productOrderHistory = data;
          this.orderHistoryVisible = true;
        },
        err => {
          console.log(err);
          $("#modalBody").html('There is an error while listing order history. Check logs for more info');
          $('#infoModal').modal('toggle');
        }
      );
    }
  }

}
