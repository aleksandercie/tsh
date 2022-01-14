import React, { useState } from "react";
import classNames from "classnames";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { ProductProps } from "./Product.types";
import { ProductStatus } from "./Product.enum";

import "./Product.scss";

const { available, unavailable, badge } = ProductStatus;

export const Product = ({
  name,
  description,
  rating,
  image,
  active,
  promo,
}: ProductProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const productClassess: string = classNames("product", {
    "product--disactive": !active,
    "product--show": loaded,
  });

  const renderBadge: JSX.Element | null = promo ? (
    <div className="product__badge">{badge}</div>
  ) : null;

  return (
    <div className={productClassess}>
      {renderBadge}
      {loaded ? null : <div className="product__loader" />}
      <img
        className="product__image"
        src={image}
        alt={name}
        onLoad={() => setLoaded(true)}
      />
      <div className="product__container">
        <h2 className="product__name">{name}</h2>
        <p className="product__description">{description}</p>
        <div className="product__ratings">
          <Rating
            defaultValue={rating}
            readOnly
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
        </div>
        <button className="product__button">
          {active ? available : unavailable}
        </button>
      </div>
    </div>
  );
};
