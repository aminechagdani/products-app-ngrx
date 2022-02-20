import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {
  GetAllProductsAction,
  GetSelectedProductsAction,
  ProductsActionsTypes,
  SearchProductsAction
} from "../../../ngrx/products.actions";
import {Router} from "@angular/router";
import {ProductsState, ProductsStateEnum} from "../../../ngrx/products.reducer";

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {

  state:ProductsState|null=null;
  readonly productsActionsTypes=ProductsActionsTypes;

  constructor(private store:Store<any>,private router:Router) { }

  ngOnInit(): void {
    this.store.subscribe(state=>{
      this.state= state.catalogState;
    });
  }

  onGetAllProducts() {
    this.store.dispatch(new GetAllProductsAction({}))
  }

  onGetSelectedProducts() {
    this.store.dispatch(new GetSelectedProductsAction({}))
  }

  onSearch(dataform:any) {
    this.store.dispatch(new SearchProductsAction(dataform.keyword))

  }

  onNewProducts() {
    this.router.navigateByUrl("/newProduct");
  }
}
