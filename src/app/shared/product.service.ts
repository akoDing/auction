import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from"rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /* private products: Product[] = [
    new Product(1,"第一个商品",1.99,3.5,"这是第一个商品",["电子产品","硬件设备"]),
    new Product(2,"第二个商品",2.99,2.5,"这是第二个商品",["电子产品","硬件设备"]),
    new Product(3,"第三个商品",3.99,4.5,"这是第三个商品",["硬件设备"]),
    new Product(4,"第四个商品",4.99,1.5,"这是第四个商品",["电子产品","硬件设备"]),
    new Product(5,"第五个商品",5.99,2.5,"这是第五个商品",["电子产品","硬件设备"]),
    new Product(6,"第六个商品",6.99,1.5,"这是第六个商品",["图书"])
  ]; */
  
  /* private comments: Comment[] = [
    new Comment(1, 1, "2017-02-02 22:22:22", "xdd", 3, "good"),
    new Comment(2, 1, "2017-03-03 22:22:22", "xdd", 4, "good21"),
    new Comment(2, 1, "2017-04-04 22:22:22", "xdd", 2, "good22"),
    new Comment(2, 1, "2017-05-05 22:22:22", "xdd", 1, "good23"),
    new Comment(5, 1, "2017-06-06 22:22:22", "xdd", 3, "good"),
    new Comment(6, 1, "2017-07-07 22:22:22", "xdd", 2, "good")
  ]; */

  searchEvent:EventEmitter<ProductSearchParams> = new EventEmitter();

  eventEmit:EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) { }

  getProducts(): Observable<Product[]> {
    // return this.products;
    return this.http.get('/api/product').pipe(map(res => res.json()));
  }

  getProduct(id:number): Observable<Product> {
  	// return this.products.find((product) => product.id == id);
    return this.http.get('/api/product/'+id).pipe(map(res => res.json()));
  }

  getCommentsForProductId(id:number): Observable<Comment[]> {
    // return this.comments.filter((comment: Comment) => comment.id == id);
    return this.http.get('/api/product/'+id+'/comments').pipe(map(res => res.json()));
  }

  getAllCategories(): string[] {
    return ["电子产品", "硬件设备", "图书"];
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/api/product', {search: this.encodeParams(params)}).pipe(map(res => res.json()));
  }

  private encodeParams(params: ProductSearchParams) {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum:URLSearchParams, key:string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());
    /* let result: URLSearchParams;

    result = Object.keys(params)
      .filter(key => params[key])
      .reduce((sum:URLSearchParams, key:string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());
    
    return result; */

  }

}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {

  }
}

export class Product {
  constructor(
  	public id:number,
  	public title:string,
  	public price:number,
  	public rating:number,
  	public desc:string,
  	public categories:Array<string>
  	) {

  }
}

export class Comment {
  constructor(
  	public id:number,
  	public productId:number,
  	public timestamp:string,
  	public uesr:string,
  	public rating:number,
  	public content:string
  	) {

  }
}
