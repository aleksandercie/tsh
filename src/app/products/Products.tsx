import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import Pagination from "@material-ui/lab/Pagination";
import { AppContext } from "../../providers/AppProviders";
import { Header } from "app/header/Header";
import { Product } from "../product/Product";
import { Info } from "../info/Info";

import { FiltersOptions } from "app/filters/Filters.enum";
import { ProductProps } from "app/product/Product.types";
import { PRODUCTS_PER_PAGE, DEFUALT_PAGE } from "./Products.constants";

import "./Products.scss";

const { active, promo, all } = FiltersOptions;

export const Products = () => {
  const products = useContext<ProductProps[] | null>(AppContext);
  const [filters, setFilters] = useState<string[]>([all]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showProducts, setShowProducts] = useState<ProductProps[] | null>(
    products
  );
  const [search, setSearch] = useState<string>("");

  useEffect(() => setShowProducts(products), [products]);

  const filteredProducts: ProductProps[] = showProducts!
    .filter(
      (product) =>
        search === "" ||
        product.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
    .filter(
      (product) =>
        (product.active && filters.includes(active)) ||
        (product.promo && filters.includes(promo)) ||
        filters.includes(all)
    );

  const countProducts: number = filteredProducts.length;
  const lastPage: number = Math.ceil(countProducts / PRODUCTS_PER_PAGE);

  const pageProducts: ProductProps[] = filteredProducts.slice(
    currentPage === 1 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE,
    PRODUCTS_PER_PAGE * currentPage
  );

  const buttonPrevClassess: string = classNames("products__button", {
    "products__button--disabled": currentPage === DEFUALT_PAGE,
  });

  const buttonNextClassess: string = classNames("products__button", {
    "products__button--disabled": currentPage === lastPage,
  });

  const isProduct: boolean = pageProducts.length !== 0;

  const renderProducts: () => JSX.Element = () =>
    isProduct ? (
      <div className="products__container">
        {pageProducts.map((product) => {
          const { id, name, description, rating, image, active, promo } =
            product;
          return (
            <Product
              name={name}
              description={description}
              rating={rating}
              image={image}
              active={active}
              promo={promo}
              id={id}
              key={id}
            />
          );
        })}
      </div>
    ) : (
      <Info />
    );

  const renderPagination: () => JSX.Element | null = () =>
    isProduct ? (
      <div className="products__pagination">
        <button
          className={buttonPrevClassess}
          onClick={() => setCurrentPage(DEFUALT_PAGE)}
        >
          First
        </button>
        <Pagination
          count={lastPage}
          page={currentPage}
          siblingCount={currentPage > 2 ? 1 : 0}
          boundaryCount={lastPage > 6 ? 1 : 2}
          hidePrevButton
          hideNextButton
          onChange={(event, value) => {
            setCurrentPage(value);
          }}
        />
        <button
          className={buttonNextClassess}
          onClick={() => setCurrentPage(lastPage)}
        >
          Last
        </button>
      </div>
    ) : null;

  return (
    <>
      <div className="products">
        <Header
          setFilters={setFilters}
          filters={filters}
          setSearch={setSearch}
          setCurrentPage={setCurrentPage}
        />
        {renderProducts()}
        {renderPagination()}
      </div>
    </>
  );
};
