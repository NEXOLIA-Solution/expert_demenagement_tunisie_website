"use client"

import { X } from "lucide-react"
import { ImageCarousel } from "./ImageCarousel"

export function ServiceModal({ service, onClose }: any) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl max-w-5xl w-full overflow-hidden relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Carousel */}
                    <ImageCarousel images={service.images} />

                    {/* Right: Content */}
                    <div className="p-8 overflow-y-auto max-h-[80vh]">
                        <h3 className="text-3xl font-bold mb-4">
                            {service.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {service.fullDescription}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
