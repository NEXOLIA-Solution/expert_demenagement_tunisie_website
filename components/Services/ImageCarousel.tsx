"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full h-80 md:h-full">
      <Image
        src={images[index]}
        alt="Service image"
        fill
        className="object-cover"
      />
    </div>
  )
}
