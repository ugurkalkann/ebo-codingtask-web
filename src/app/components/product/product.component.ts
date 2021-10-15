import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderProductRequest, Product } from 'src/app/_model/Product';
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

  constructor(private route: ActivatedRoute, private productService: ProductService, public storageService: StorageService) {
    this.productId = this.route.snapshot.params.id; 
  }

  ngOnInit(): void {
    if(this.productId){
      this.productService.getProduct(this.productId).subscribe(
        data => {
          this.currentProduct = data;
          console.log(this.currentProduct);
        },
        err => {
          console.log(err);
          $("#modalBody").html('There is an error while listing products. Check logs for more info');
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
      },
      err => {
        console.log(err);
        $("#modalBody").html('There is an error while listing products. Check logs for more info');
        $('#infoModal').modal('toggle');
      }
    );
  }

}