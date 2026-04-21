// "use client"
// import { usePathname } from "next/navigation"
// import { useEffect, useRef } from "react"

// export default function PageTracker() {
//   const pathname = usePathname()
//   const startTime = useRef<number>(Date.now())

//   useEffect(() => {
//     startTime.current = Date.now()

//     return () => {
//       const duration = Date.now() - startTime.current

//       const pages = JSON.parse(localStorage.getItem("page_views") || "[]")
//       pages.push({
//         page: pathname,
//         duration,
//         enteredAt: new Date().toISOString(),
//       })

//       localStorage.setItem("page_views", JSON.stringify(pages))
//     }
//   }, [pathname])

//   return null
// }