import { useReducer } from "react";
import {
  FilterState,
  DEFAULT_FILTERS,
  computeActiveFilters,
} from "../constants/filter-config";

export type SortOption = "relevancia" | "preco-asc" | "preco-desc" | "distancia";

export type PageState = {
  searchTerm: string;
  viewMode: "grid" | "list";
  filters: FilterState;
  sortBy: SortOption;
  showMobileFilters: boolean;
  showSortMenu: boolean;
};

export type PageAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_VIEW_MODE"; payload: "grid" | "list" }
  | { type: "SET_FILTERS"; payload: FilterState }
  | { type: "TOGGLE_CATEGORY"; payload: string }
  | { type: "REMOVE_CATEGORY"; payload: string }
  | { type: "SET_SORT"; payload: SortOption }
  | { type: "TOGGLE_MOBILE_FILTERS" }
  | { type: "TOGGLE_SORT_MENU" }
  | { type: "CLOSE_SORT_MENU" }
  | { type: "CLEAR_ALL" };

const initialState: PageState = {
  searchTerm: "",
  viewMode: "list",
  filters: DEFAULT_FILTERS,
  sortBy: "relevancia",
  showMobileFilters: false,
  showSortMenu: false,
};

export function reducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "TOGGLE_CATEGORY": {
      const current = state.filters.categories;
      const updated = current.includes(action.payload)
        ? current.filter((c) => c !== action.payload)
        : [...current, action.payload];
      return { ...state, filters: { ...state.filters, categories: updated } };
    }
    case "REMOVE_CATEGORY":
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: state.filters.categories.filter((c) => c !== action.payload),
        },
      };
    case "SET_SORT":
      return { ...state, sortBy: action.payload, showSortMenu: false };
    case "TOGGLE_MOBILE_FILTERS":
      return { ...state, showMobileFilters: !state.showMobileFilters };
    case "TOGGLE_SORT_MENU":
      return { ...state, showSortMenu: !state.showSortMenu };
    case "CLOSE_SORT_MENU":
      return { ...state, showSortMenu: false };
    case "CLEAR_ALL":
      return { ...state, searchTerm: "", filters: DEFAULT_FILTERS };
  }
}

export function useServicosState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { hasActive, count } = computeActiveFilters(state.filters);
  return { state, dispatch, hasActiveFilters: hasActive, activeCount: count };
}
