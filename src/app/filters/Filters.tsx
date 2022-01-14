import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { FiltersOptions } from "./Filters.enum";
import { FiltersProps } from "./Filters.types";

import "./Filters.scss";

const { active, promo, all } = FiltersOptions;

export const Filters = ({
  setFilters,
  filters,
  setSearch,
  setCurrentPage,
}: FiltersProps) => {
  const handleChange = (e: { target: { checked: boolean; name: string } }) => {
    e.target.checked
      ? filters.includes(all)
        ? setFilters([String(e.target.name)])
        : setFilters([...filters, String(e.target.name)])
      : filters.length > 1
      ? setFilters(filters.filter((item) => item !== String(e.target.name)))
      : setFilters([all]);
    setCurrentPage(1);
  };

  return (
    <div className="filters">
      <div className="filters__search">
        <input
          className="filters__input"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.71 11H12.5L17.49 16L16 17.49L11 12.5V11.71L10.73 11.43C9.59 12.41 8.11 13 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 8.11 12.41 9.59 11.43 10.73L11.71 11ZM2 6.5C2 8.99 4.01 11 6.5 11C8.99 11 11 8.99 11 6.5C11 4.01 8.99 2 6.5 2C4.01 2 2 4.01 2 6.5Z"
            fill="#1A1B1D"
          />
        </svg>
      </div>

      <div className="filters__checkboxes">
        <FormControlLabel
          control={
            <Checkbox name={active} onChange={handleChange} color="primary" />
          }
          label={active}
        />
        <FormControlLabel
          control={
            <Checkbox name={promo} onChange={handleChange} color="primary" />
          }
          label={promo}
        />
      </div>
    </div>
  );
};
