import React from "react";
import { Link } from "react-router-dom";
import { Filters } from "app/filters/Filters";
import { Logo } from "app/logo/Logo";

import { AppRoute } from "routing/AppRoute.enum";
import { HeaderProps } from "./Header.types";

import "./Header.scss";

export const Header = ({
  setFilters,
  filters,
  setSearch,
  setCurrentPage,
}: HeaderProps) => (
  <div className="header">
    <div className="header__container">
      <Logo />
      <Filters
        setFilters={setFilters}
        filters={filters}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />
      <Link to={AppRoute.login} className="header__login">
        Log in
      </Link>
    </div>
  </div>
);
