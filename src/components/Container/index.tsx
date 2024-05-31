import React from "react"
import './style.scss'

interface ContainerProps {
  children: React.ReactNode
  classname?: string
  htmlId?: string
}

export default function Container({ children, classname, id }: ContainerProps) {
  return (
      <div className={classname} id={id}>
        {children}
      </div>
  )
}
