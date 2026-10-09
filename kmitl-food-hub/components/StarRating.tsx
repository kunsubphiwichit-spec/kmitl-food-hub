"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

export default function StarRating({ 
  value, 
  onChange, 
  size = "md", 
  readOnly = false 
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const getSize = () => {
    switch (size) {
      case "sm": return 16;
      case "md": return 24;
      case "lg": return 32;
      default: return 24;
    }
  };

  const starSize = getSize();
  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={`flex items-center gap-1 ${readOnly ? "" : "cursor-pointer"}`}>
      {[1, 2, 3, 4, 5].map((index) => {
        const isFilled = index <= displayValue;
        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            className={`transition-transform ${readOnly ? "" : "hover:scale-110 focus:outline-none"}`}
            onMouseEnter={() => !readOnly && setHoverValue(index)}
            onMouseLeave={() => !readOnly && setHoverValue(null)}
            onClick={() => !readOnly && onChange && onChange(index)}
          >
            <Star
              size={starSize}
              className={`transition-colors ${
                isFilled 
                  ? "text-[#C8490B] fill-[#C8490B]" 
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
