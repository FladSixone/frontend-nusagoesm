import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className="relative w-full min-h-screen bg-white dark:bg-gray-900">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center items-center flex-col sm:p-0">
          <div className="flex-1 flex items-center justify-center w-full relative z-20 pointer-events-auto">
            {children}
          </div>

          <div className="absolute left-0 top-0 h-full w-1/4 z-0 hidden lg:block bg-brand-950 dark:bg-white/5 pointer-events-none">
            <div className="h-full flex items-center justify-center">
              <GridShape />
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full w-1/4 z-0 hidden lg:block bg-brand-950 dark:bg-white/5 pointer-events-none">
            <div className="h-full flex items-center justify-center">
              <GridShape />
            </div>
          </div>

          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
    
  );
}
