import { createContext, useContext, useMemo, useReducer } from "react";

const AppStateContext = createContext(null);

const initialState = {
  activePage: "command-center",
  onboarding: {
    goals: [],
    interests: [],
    experience: "Mid Level"
  },
  resume: {
    file: null,
    result: null,
    loading: false,
    error: ""
  },
  auth: {
    user: { name: "Aarav Mehta", plan: "Pro", streak: 6 }
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, activePage: action.payload };
    case "SET_ONBOARDING":
      return { ...state, onboarding: { ...state.onboarding, ...action.payload } };
    case "SET_RESUME_FILE":
      return { ...state, resume: { ...state.resume, file: action.payload, error: "" } };
    case "RESUME_LOADING":
      return { ...state, resume: { ...state.resume, loading: action.payload } };
    case "SET_RESUME_RESULT":
      return { ...state, resume: { ...state.resume, result: action.payload, error: "" } };
    case "SET_RESUME_ERROR":
      return { ...state, resume: { ...state.resume, error: action.payload } };
    case "CLEAR_RESUME_ERROR":
      return { ...state, resume: { ...state.resume, error: "" } };
    default:
      return state;
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}
