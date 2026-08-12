"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);
    updateScrollCompletion();

    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-150 ease-out"
      style={{ width: `${completion}%` }}
      aria-hidden="true"
    />
  );
}

export default ReadingProgress;
