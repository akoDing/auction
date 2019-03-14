import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Comment, ProductService } from '../shared/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  product: Product;

  comments: Comment[];

  newRating: number = 5;
  newComment: string = "";

  isCommentHidden: boolean = true;

  constructor(private routeInfo: ActivatedRoute, private ProductService: ProductService) { }

  ngOnInit() {

    // 订阅(Subscribe)
    /* this.routeInfo.params.subscribe(params => {
      console.log(params['productId']);
    }); */

  	let productId: number = this.routeInfo.snapshot.params["productId"];

  	this.ProductService.getProduct(productId).subscribe(
      product => this.product = product
    );

  	this.ProductService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  	// this.productTitle = this.routeInfo.snapshot.params["prodTitle"];
  }

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toISOString(), "someone", this.newRating, this.newComment);
    this.comments.unshift(comment);

    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;

    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;
  }

}
