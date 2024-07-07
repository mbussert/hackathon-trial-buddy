import Image from 'next/image'
import TypeHeader from '../type-header'
import { Button } from '../ui/button'

export default function Hero() {
  return (
    <div className="w-full relative overflow-hidden py-24 lg:py-32 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
      {/* Gradients */}
      <Image
        alt=""
        width={1400}
        height={1200}
        className="absolute hidden min-w-full min-h-full sm:flex shrink-0 top-0 left-0 opacity-30 xl:opacity-15"
        src="/images/hero-bg4.png"
      />
      <Image
        alt=""
        width={600}
        height={700}
        className="absolute flex min-w-full min-h-full sm:hidden top-0 left-0 opacity-20"
        src="/images/hero-bg4-mobile.png"
      />
      <div
        aria-hidden="true"
        className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gradient-to-r from-sky-500 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl blur-3xl w-[100rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-sky-200 via-sky-200 to-sky-500 opacity-60" />
        <div className="bg-gradient-to-tr blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-sky-200 via-sky-200 to-sky-500 opacity-60" />
      </div>

      <div
        aria-hidden="true"
        className="flex absolute -bottom-96 start-1/2 transform -translate-x-1/2 opacity-20"
      >
        <div className="bg-gradient-to-l from-sky-500 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-sky-200 via-sky-200 to-sky-500" />
      </div>
      {/* End Gradients */}
      <div className="relative z-10">
        <div className="container py-10 lg:py-16">
          <div className="max-w-2xl text-center mx-auto">
            <p className="border border-slate-600 text-xs md:text-sm font-medium p-2 rounded-full w-fit mx-auto">
              Transform your legal practice with AI insights
            </p>
            {/* Title */}
            <div className="mt-5 max-w-xl mx-auto">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Revolutionize The Way
              </h1>
              <TypeHeader />
            </div>
            {/* End Title */}
            <div className="mt-5 max-w-3xl mx-auto">
              <p className="text-xl font-semibold text-muted-foreground">
                The future of trial preparation is here.
              </p>
            </div>
            {/* Buttons */}
            <div className="mt-8 gap-3 flex justify-center">
              <Button size={'lg'}>Get Started Free</Button>
              <Button size={'lg'} variant={'outline'}>
                Learn more
              </Button>
            </div>
            {/* End Buttons */}
          </div>
        </div>
      </div>
    </div>
  )
}
