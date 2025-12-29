import React from 'react'

const Container = ({children,classname}) => {
  return (
    <section className={`px-10 ${classname}`}>
        {children}
    </section>
  )
}

export default Container