"use client";

import { createContext, useContext, useState } from "react";

interface LoaderContextValue {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextValue>({
  loader: false,
  setLoader: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {

  const [loader,setLoader] = useState(false);

  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {children}
      {loader  && <GlobalLoaderOverlay />}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}

function GlobalLoaderOverlay() {
  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-white/40">
      <div className="flex flex-col items-center gap-4">
        {/* Bouncing dots */}
        <div className="flex items-center gap-2">
          <span className="loader-dot h-3.5 w-3.5 rounded-full bg-violet-500" style={{ animationDelay: "0ms" }} />
          <span className="loader-dot h-3.5 w-3.5 rounded-full bg-pink-500" style={{ animationDelay: "150ms" }} />
          <span className="loader-dot h-3.5 w-3.5 rounded-full bg-amber-400" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
