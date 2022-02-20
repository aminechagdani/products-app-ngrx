import {Injectable} from "@angular/core";
import {ProductsService} from "../services/products.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {
  DeleteProductActionError,
  DeleteProductActionSuccess,
  EditProductActionError,
  EditProductActionSuccess,
  GetAllProductsActionError,
  GetAllProductsActionSuccess,
  GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess,
  NewProductActionSuccess,
  ProductsActions,
  ProductsActionsTypes,
  SaveProductActionSuccess,
  SearchProductsActionError,
  SearchProductsActionSuccess,
  SelectProductActionError,
  SelectProductActionSuccess,
  UpdateProductActionError,
  UpdateProductActionSuccess,
} from "./products.actions";

@Injectable()
export class ProductsEffects{
  constructor(private effectActions:Actions, private productsService:ProductsService) {
  }

  getAllProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.getProducts()
          .pipe(
            map((products)=>new GetAllProductsActionSuccess(products)),
            catchError((err)=>of(new GetAllProductsActionError(err.message)))
          )
      })
    )
  );
  /*Get Selected Products */
  getSelectedProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.getSelectedProducts()
          .pipe(
            map((products)=>new GetSelectedProductsActionSuccess(products)),
            catchError((err)=>of(new GetSelectedProductsActionError(err.message)))
          )
      })
    )
  );

  /*Search Products Effect */
  searchProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.searchProducts(action.payload)
          .pipe(
            map((products)=>new SearchProductsActionSuccess(products)),
            catchError((err)=>of(new SearchProductsActionError(err.message)))
          )
      })
    )
  );

  /*Select Products Effect */
  selectProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.setSelected(action.payload)
          .pipe(
            map((product)=>new SelectProductActionSuccess(product)),
            catchError((err)=>of(new SelectProductActionError(err.message)))
          )
      })
    )
  );

  /*Delete Products Effect */
  deleteProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.DELETE_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.delete(action.payload.id)
          .pipe(
            map(()=>new DeleteProductActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteProductActionError(err.message)))
          )
      })
    )
  );

  /*New Products Effect */
  newProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.NEW_PRODUCT),
      map((action:ProductsActions)=>{
        return new NewProductActionSuccess({});
      })
    )
  );

  /*Save Products Effect */
  saveProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SAVE_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.save(action.payload)
          .pipe(
            map((product)=>new SaveProductActionSuccess(product)),
            catchError((err)=>of(new DeleteProductActionError(err.message)))
          )
      })
    )
  );

  /*Edit Products Effect */
  editProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.EDIT_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.getProductById(action.payload)
          .pipe(
            map((product)=>new EditProductActionSuccess(product)),
            catchError((err)=>of(new EditProductActionError(err.message)))
          )
      })
    )
  );

  /*Update Products Effect */
  updateProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.UPDATE_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productsService.update(action.payload)
          .pipe(
            map((product)=>new UpdateProductActionSuccess(product)),
            catchError((err)=>of(new UpdateProductActionError(err.message)))
          )
      })
    )
  );


}
