'use client'

import { TypeAnimation } from 'react-type-animation'

export default function TypeHeader() {
  const headerSequence = [
    500,
    'You Prepare.',
    3000,
    'You Litigate.',
    3000,
    'You Strategize.',
    3000,
    'You Win.',
    3000,
  ]

  return (
    <div className="">
      <h1 className="hidden sm:block scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <TypeAnimation sequence={headerSequence} speed={20} repeat={Infinity} />
      </h1>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl sm:hidden">
        You Prepare.
      </h1>
    </div>
  )
}
