import { create } from "zustand";

interface IFilterStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
}

export const useFilterStore = create<IFilterStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  clearSearchTerm: () => set({ searchTerm: "" }),
}));
