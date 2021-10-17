import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/Product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getValues().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
        $("#modalBody").html('There is an error while listing products. Check logs for more info');
        $('#infoModal').modal('toggle');
      }
    );
  }

}
