'use client'
import { Music } from "lucide-react"
import { cn } from "./components.js/cn"
import { useEffect, useState } from "react"
import TestIcon from "./components.js/musicIcon"


export default function Header() {

    const [ scrolled, setScrolled ] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return (
<>
<header className={cn("fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300", scrolled ? "glass-morphism" : "bg-transparent")}>
    <div className="max-w-7xl mx-auto flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-primary p-2 animate-pulse-subtle">
          {/*<Music className="w-5 h-5 text-white" />*/}
          <TestIcon />
        </div>
        <h1 className="text-xl font-semibold">
          <span className="gradient-text">Core Collectif</span> Copilot
        </h1>
      </div>
    </div>
  </header>;
  </>
)
  }