import { Brain, ChevronRightIcon, LayoutDashboard, ListChecks } from 'lucide-react'

export default function AboutSection() {
  return (
    <>
      {/* Icon Blocks */}
      <div className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Welcome to <span className="font-extrabold">Trial Buddy</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              The revolutionary web app designed specifically for lawyers to streamline case
              management and trial preparation. Our advanced AI technology provides you with
              unparalleled insights into your pleadings, case law, and documents, making your trial
              preparation more efficient and effective.
            </p>
            <p className="mt-5">
              <a
                className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                href="#"
              >
                Learn more
                <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
              </a>
            </p>
          </div>
          {/* End Col */}
          <div className="space-y-6 lg:space-y-10">
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                <Brain className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">AI-Driven Insights</h3>
                <p className="mt-1 text-muted-foreground">
                  Harness the power of artificial intelligence to analyze your legal documents and
                  extract critical insights. Stay ahead with instant access to relevant information,
                  trends, and key points.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border  bg-primary text-primary-foreground">
                <ListChecks className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">Automated Checklists</h3>
                <p className="mt-1 text-muted-foreground">
                  Preparing for trials and hearings has never been easier. Trial Buddy generates
                  comprehensive checklists tailored to each case, ensuring you&apos;re always
                  prepared and nothing is overlooked.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                <LayoutDashboard className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">Centralized Dashboard</h3>
                <p className="mt-1 text-muted-foreground">
                  Manage all your trials and hearings from a single, intuitive dashboard. Keep track
                  of deadlines, important dates, and case statuses effortlessly.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </>
  )
}
