import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import { AppProvidersProps } from "./AppProviders.types";
import { ProductProps } from "app/product/Product.types";

export const AppContext = createContext<ProductProps[] | null>(null);

const defualtAppContext: ProductProps[] = [
  {
    description:
      "Quam soluta et consequuntur velit ipsa sint facere occaecati fugiat.",
    id: 1,
    image: "https://picsum.photos/640/480?random=4946",
    name: "Awesome Steel Fish",
    promo: true,
    rating: 2,
    active: true,
  },
];

export const AppProviders = ({ children }: AppProvidersProps) => {
  const [products, setProducts] = useState<ProductProps[]>(defualtAppContext);

  useEffect(() => {
    axios
      .get(`https://join-tsh-api-staging.herokuapp.com/products`)
      .then((res) => {
        setProducts(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider value={products}>
      <Router>{children}</Router>
    </AppContext.Provider>
  );
};
