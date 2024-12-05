"use client";

import { Product } from "@/types/product";
import { createContext, ReactNode, useContext, useReducer } from "react";

type NewProduct = Omit<Product, "id" | "created_at" | "updated_at"> &
  Partial<{ id: number }>;

const initialProduct: NewProduct = {
  id: undefined,
  name: "",
  unit_price: "",
  description: "",
  category_id: undefined,
};

type ProductAction =
  | {
      type: "set";
      product: NewProduct;
    }
  | {
      type: "reset";
    };

type DialogAction = "open" | "close";

export const ProductContext = createContext<NewProduct | null>(null);
export const ProductDispatchContext = createContext<
  ((action: ProductAction) => void) | null
>(null);
export const ProductDialogContext = createContext(false);
export const ProductDialogDispatchContext = createContext<
  ((action: DialogAction) => void) | null
>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [product, dispatch] = useReducer(productReducer, initialProduct);
  const [isDialogOpen, dialogDispatch] = useReducer(dialogReducer, false);

  return (
    <>
      <ProductContext.Provider value={product}>
        <ProductDispatchContext.Provider value={dispatch}>
          <ProductDialogContext.Provider value={isDialogOpen}>
            <ProductDialogDispatchContext.Provider value={dialogDispatch}>
              {children}
            </ProductDialogDispatchContext.Provider>
          </ProductDialogContext.Provider>
        </ProductDispatchContext.Provider>
      </ProductContext.Provider>
    </>
  );
}

function productReducer(
  product: NewProduct,
  action: ProductAction
): NewProduct {
  switch (action.type) {
    case "set":
      return action.product;
    case "reset":
      return initialProduct;
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}

function dialogReducer(isDialogOpen: boolean, action: DialogAction): boolean {
  switch (action) {
    case "open":
      return true;
    case "close":
      return false;
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
}

export function useProduct() {
  const product = useContext(ProductContext);
  const dispatch = useContext(ProductDispatchContext);
  if(product === null || dispatch === null) {
    throw new Error("need to wrap component in ProductProvider");
  }

  return [product, dispatch] as const;
}

export function useProductDialog() {
  const isDialogOpen = useContext(ProductDialogContext);
  const dispatch = useContext(ProductDialogDispatchContext);
  if(isDialogOpen === null || dispatch === null) {
    throw new Error("need to wrap component in ProductDialogProvider");
  }

  return [isDialogOpen, dispatch] as const;
}