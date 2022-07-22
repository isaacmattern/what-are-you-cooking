import { useEffect } from 'react';
import React from 'react'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found | What Are You Cooking?';
  }, []);

  return (
    <div className=".not-found">
        <p>Page Not Found.</p>
    </div>
  );
}