"use client"

import Image from "next/image"
import logoAla from "@/public/logoAla.png"
import styles from "./PageLoader.module.css"

export default function PageLoader({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <div className={styles.pageLoader}>
      <div className={styles.logoBounce}>
        <Image src={logoAla} alt="Loading" width={120} height={120} priority />
      </div>
    </div>
  )
}
