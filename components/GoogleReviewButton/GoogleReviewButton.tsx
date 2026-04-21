"use client"


// components/GoogleReviewButton.tsx
import Image from "next/image";

export default function GoogleReviewButton() {
  const reviewUrl = "https://g.page/r/CS6vZn0izwKQEAE/review";

  return (
    <div className="flex flex-col items-center gap-4 p-4  rounded-lg shadow-md max-w-sm mx-auto">
      {/* Bouton pour laisser un avis */}
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        ⭐ Écrire un avis
      </a>

     
    </div>
  );
}