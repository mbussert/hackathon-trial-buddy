'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { CartesianGrid, XAxis, Bar, BarChart, Rectangle, AreaChart, Area } from 'recharts'
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
  ChartConfig,
} from '@/components/ui/chart'

export default function DashboardHome() {
  const chartData = [
    { month: 'January', active: 186, closed: 80 },
    { month: 'February', active: 305, closed: 200 },
    { month: 'March', active: 237, closed: 120 },
    { month: 'April', active: 73, closed: 190 },
    { month: 'May', active: 209, closed: 130 },
    { month: 'June', active: 214, closed: 140 },
  ]

  const chartConfig = {
    active: {
      label: 'Active',
      color: 'hsl(var(--chart-1))',
    },
    closed: {
      label: 'Closed',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-500 text-primary-foreground px-4 py-2 text-sm font-medium">
        <p>Warning: Statute of Limitations deadlines coming up for 3 cases</p>
      </div>
      <section className="flex-1 grid gap-4 p-4 md:p-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Active & Closed Cases</CardTitle>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-4 h-4 text-muted-foreground" />
              <CircleCheckIcon className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Active Cases (+5 from last month)</p>
              </div>
              <div>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">Closed Cases (+3 from last month)</p>
              </div>
            </div>
            <div className="min-h-[292px] mt-4">
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={value => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-active)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-active)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillClosed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-closed)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-closed)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="closed"
                    type="natural"
                    fill="url(#fillClosed)"
                    fillOpacity={0.4}
                    stroke="var(--color-closed)"
                    stackId="a"
                  />
                  <Area
                    dataKey="active"
                    type="natural"
                    fill="url(#fillActive)"
                    fillOpacity={0.4}
                    stroke="var(--color-active)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Deadlines</CardTitle>
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
            <div className="mt-4">
              <div className="font-bold underline">Upcoming Hearings:</div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Smith v. Jones</div>
                    <div className="text-sm text-muted-foreground">Hearing Date: June 15, 2024</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckIcon className="w-4 h-4" />
                    <span className="sr-only">Mark as done</span>
                  </Button>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Johnson v. Williams</div>
                    <div className="text-sm text-muted-foreground">Hearing Date: July 1, 2024</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckIcon className="w-4 h-4" />
                    <span className="sr-only">Mark as done</span>
                  </Button>
                </li>
              </ul>
              <div className="font-bold underline mt-4">Upcoming Trials:</div>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Garcia v. Hernandez</div>
                    <div className="text-sm text-muted-foreground">Trial Date: August 10, 2024</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CheckIcon className="w-4 h-4" />
                    <span className="sr-only">Mark as done</span>
                  </Button>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Recently Viewed Cases</CardTitle>
            <BarChartIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Smith v. Jones</TableCell>
                  <TableCell>John Smith</TableCell>
                  <TableCell>Superior Court</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>2 days ago</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit case</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Johnson v. Williams</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>District Court</TableCell>
                  <TableCell>
                    <Badge variant="outline">Closed</Badge>
                  </TableCell>
                  <TableCell>1 week ago</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit case</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Garcia v. Hernandez</TableCell>
                  <TableCell>Maria Garcia</TableCell>
                  <TableCell>Superior Court</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>3 days ago</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit case</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Brown v. Wilson</TableCell>
                  <TableCell>Emily Brown</TableCell>
                  <TableCell>District Court</TableCell>
                  <TableCell>
                    <Badge variant="outline">Closed</Badge>
                  </TableCell>
                  <TableCell>1 month ago</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit case</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Martinez v. Rodriguez</TableCell>
                  <TableCell>Juan Martinez</TableCell>
                  <TableCell>Superior Court</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>2 weeks ago</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit case</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2 xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Frequently Used Features</CardTitle>
            <BoxIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Link
              href="#"
              className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <BriefcaseIcon className="w-6 h-6 text-muted-foreground group-hover:text-accent-foreground" />
              <span className="text-sm font-medium">Case Management</span>
            </Link>
            <Link
              href="#"
              className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <FileTextIcon className="w-6 h-6 text-muted-foreground group-hover:text-accent-foreground" />
              <span className="text-sm font-medium">Document Storage</span>
            </Link>
            <Link
              href="#"
              className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <MessageCircleIcon className="w-6 h-6 text-muted-foreground group-hover:text-accent-foreground" />
              <span className="text-sm font-medium">Client Communication</span>
            </Link>
            <Link
              href="#"
              className="group flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-4 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              <CalendarIcon className="w-6 h-6 text-muted-foreground group-hover:text-accent-foreground" />
              <span className="text-sm font-medium">Calendar</span>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function BarChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}

function BarchartactiveChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          visitors: {
            label: 'Visitors',
          },
          chrome: {
            label: 'Chrome',
            color: 'hsl(var(--chart-1))',
          },
          safari: {
            label: 'Safari',
            color: 'hsl(var(--chart-2))',
          },
          firefox: {
            label: 'Firefox',
            color: 'hsl(var(--chart-3))',
          },
          edge: {
            label: 'Edge',
            color: 'hsl(var(--chart-4))',
          },
          other: {
            label: 'Other',
            color: 'hsl(var(--chart-5))',
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { browser: 'chrome', visitors: 187, fill: 'var(--color-chrome)' },
            { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
            { browser: 'firefox', visitors: 275, fill: 'var(--color-firefox)' },
            { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
            { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="browser" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar
            dataKey="visitors"
            strokeWidth={2}
            radius={8}
            activeIndex={2}
            activeBar={({ ...props }) => (
              <Rectangle
                {...props}
                fillOpacity={0.8}
                stroke={props.payload.fill}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            )}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

function BoxIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}

function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}
