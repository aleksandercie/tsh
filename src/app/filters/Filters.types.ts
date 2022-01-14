export type FiltersProps = {
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filters: string[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
