import { useEffect } from "react";

export function useCustomCursor() {
  useEffect(() => {
    // Pink pixel cursor designs as SVG data URLs (larger size: 32x32)
    const pinkArrowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="9" width="3" height="3" fill="#FF69B4"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="6" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="21" width="3" height="3" fill="#FFB6C1"/>
        <rect x="9" y="24" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkHeartCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="12" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="21" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="24" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FFC0CB"/>
        <rect x="21" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="24" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="21" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="27" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkStarCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="9" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="12" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkBowCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="24" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="15" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="15" width="3" height="3" fill="#FFB6C1"/>
        <rect x="21" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFE4E1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="21" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;

    const pinkPawCursor = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <!-- Left toe -->
        <rect x="6" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="9" y="12" width="3" height="3" fill="#FF1493"/>
        <!-- Middle toe -->
        <rect x="13" y="6" width="3" height="3" fill="#FF1493"/>
        <rect x="13" y="9" width="3" height="3" fill="#FF69B4"/>
        <rect x="16" y="9" width="3" height="3" fill="#FF1493"/>
        <!-- Right toe -->
        <rect x="21" y="9" width="3" height="3" fill="#FF1493"/>
        <rect x="21" y="12" width="3" height="3" fill="#FF69B4"/>
        <rect x="24" y="12" width="3" height="3" fill="#FF1493"/>
        <!-- Main pad outline -->
        <rect x="9" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="18" y="15" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="15" y="18" width="3" height="3" fill="#FFB6C1"/>
        <rect x="18" y="18" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="18" width="3" height="3" fill="#FF1493"/>
        <rect x="6" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="12" y="21" width="3" height="3" fill="#FFC0CB"/>
        <rect x="15" y="21" width="3" height="3" fill="#FFC0CB"/>
        <rect x="18" y="21" width="3" height="3" fill="#FF69B4"/>
        <rect x="21" y="21" width="3" height="3" fill="#FF1493"/>
        <rect x="9" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="15" y="24" width="3" height="3" fill="#FF69B4"/>
        <rect x="18" y="24" width="3" height="3" fill="#FF1493"/>
        <rect x="12" y="27" width="3" height="3" fill="#FF1493"/>
        <rect x="15" y="27" width="3" height="3" fill="#FF1493"/>
      </svg>
    `)}`;
    
    const handleClick = () => {
      // Pick random cursor (excluding paw for general cursor)
      const generalCursors = [pinkArrowCursor, pinkHeartCursor, pinkStarCursor, pinkBowCursor];
      const randomCursor = generalCursors[Math.floor(Math.random() * generalCursors.length)];
      
      // Apply cursor to all elements
      const style = document.createElement('style');
      style.id = 'dynamic-cursor-style';
      
      // Remove previous dynamic style if exists
      const existingStyle = document.getElementById('dynamic-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      style.innerHTML = `
        *, *::before, *::after {
          cursor: url("${randomCursor}") 6 6, auto !important;
        }
        a, button, [role="button"], [type="button"], [type="submit"], [type="reset"],
        select, summary, [onclick], .cursor-pointer {
          cursor: url("${pinkPawCursor}") 15 15, pointer !important;
        }
        input[type="text"], input[type="email"], input[type="password"], input[type="search"],
        input[type="tel"], input[type="url"], input[type="number"], textarea, [contenteditable="true"] {
          cursor: url("${randomCursor}") 6 6, text !important;
        }
      `;
      
      document.head.appendChild(style);
    };

    // Set initial cursor
    handleClick();
    
    // Add click listener to entire document
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      const existingStyle = document.getElementById('dynamic-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
}
