import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {ProductsState, ProductsStateEnum} from "../../../ngrx/products.reducer";
import {Store} from "@ngrx/store";
import {NewProductAction, SaveProductAction} from "../../../ngrx/products.actions";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productFormGroup:FormGroup|null=null;
  state:ProductsState| null=null;
  readonly productStateEnum=ProductsStateEnum;
  submitted:boolean=false;

  constructor(private store:Store<any>,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(new NewProductAction({}));
    this.store.subscribe(state=>{
      this.state= state.catalogState;
      if(this.state?.dataState==ProductsStateEnum.NEW){
        this.productFormGroup=this.fb.group({
          name:["",Validators.required],
          price:[0,Validators.required],
          quantity:[0,Validators.required],
          selected:[true,Validators.required]
        })
      }

    });
  }

  newProduct() {
    this.store.dispatch(new NewProductAction({}));
  }

  onSaveProduct() {
    this.submitted=true;
    if(!this.productFormGroup?.valid) return
    this.store.dispatch(new SaveProductAction(this.productFormGroup?.value));
  }
}
