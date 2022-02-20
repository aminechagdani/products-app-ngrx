import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {Store} from "@ngrx/store";
import {DeleteProductAction, SelectProductAction} from "../../../../ngrx/products.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product:Product|null=null;
  constructor(private store:Store,private router:Router) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.store.dispatch(new SelectProductAction(product))
 }

  onDelete(product: Product) {
    this.store.dispatch(new DeleteProductAction(product));
  }

  onEdit(product: Product) {
    this.router.navigateByUrl("/editProduct/"+product.id);
  }
}
