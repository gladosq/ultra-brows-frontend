import {create} from 'zustand';

interface BrowsState {
    isUserLogged: boolean | null;
    setIsUserLogged: (value: boolean) => void;
}

const useMainStore = create<BrowsState>((set) => ({
    isUserLogged: null,
    setIsUserLogged: (value) => set((state) => ({isUserLogged: value})),
}));

export default useMainStore;
