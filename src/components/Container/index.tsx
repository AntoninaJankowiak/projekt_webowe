import React from "react"
import './style.scss'

interface ContainerProps {
  children: React.ReactNode
  classname?: string
}

export default function Container({ children, classname }: ContainerProps) {
  return (
      <div className={classname}>
        {children}
      </div>
  )
}
