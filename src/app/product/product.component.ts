import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../shared/product.service';
import { FormControl } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Observable<Product[]>;

  // private keyword: string;

  // private titleFilter: FormControl = new FormControl();

  private imgUrl = 'http://placehold.it/320x150';

  constructor(private ProductService: ProductService) {
    /* this.titleFilter.valueChanges
    .pipe(debounceTime(500))
    .subscribe(
      value => this.keyword = value
    ); */
  }

 ngOnInit() {
  	this.products = this.ProductService.getProducts();
    // add product
    // this.products.push(new Product(7,"第七个商品",7.99,1.5,"这是第七个商品",["图书"]))

    // 在商品组件中订阅在ProductService这个searchEvent事件
    this.ProductService.searchEvent.subscribe(
      params => this.products = this.ProductService.search(params)
      //  同理 上面的取值方法
      /* (value:any) => {
        this.products = this.ProductService.search(value)
      } */
    );

    this.ProductService.eventEmit.subscribe((value: any) => {
      alert(value);
    })

  }



}
