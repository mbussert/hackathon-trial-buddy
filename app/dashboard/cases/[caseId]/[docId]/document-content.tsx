import { CornerDownLeft, Mic, MoreHorizontal, Paperclip, Sparkles } from 'lucide-react'
import { TCase } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { format } from 'date-fns'
import { CaseDocsRecord } from '@/src/xata'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function DocumentContent({ docData }: { docData: CaseDocsRecord }) {
  const uploadDate = format(docData.xata_createdat, 'PPP')
  const { caseInformation } = docData?.summary

  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <ol>
          {Object.entries(value).map(([nestedKey, nestedValue]: any) => (
            <li className="pl-4" key={nestedKey}>
              <strong>{parseInt(nestedKey) + 1}. </strong> {nestedValue.toString()}
            </li>
          ))}
        </ol>
      )
    } else {
      return value.toString()
    }
  }

  const omitKeys = ['caseInformation']

  function camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1')
    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  return (
    <>
      <header className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">{docData.fileName}</h1>
          <h1 className="text-xl ">Type: {docData.type}</h1>
          <h2>{caseInformation?.court}</h2>
          <h2>{caseInformation?.caseNumber}</h2>
          <h2>Added: {uploadDate}</h2>
        </div>
        <Button>Edit</Button>
      </header>
      <div className="grid flex-1 items-start gap-8 mt-8 p-4 sm:px-6 sm:py-0 md:grid-cols-2 lg:grid-cols-2">
        <Card className="md:col-span-1 lg:col-span-1 w-full h-full">
          <CardHeader>
            <CardTitle>AI Summary & Insights</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid gap-4">
              <ScrollArea className="h-[600px] overflow-auto p-2">
                {Object.entries(docData?.summary)
                  .filter(([key]) => !omitKeys.includes(key))
                  .map(([key, value]: any) => (
                    <h3 className="py-2" key={key}>
                      <span className="font-bold underline">{camelCaseToWords(key)}:</span>{' '}
                      {renderValue(value)}
                    </h3>
                  ))}
              </ScrollArea>

              <div className="space-x-4 flex flex-col">
                <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring w-full">
                  <Label htmlFor="message" className="sr-only">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  />
                  <div className="flex items-center p-3 pt-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Mic className="size-4" />
                            <span className="sr-only">Use Microphone</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Use Microphone</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
                      Send Message
                      <CornerDownLeft className="size-3.5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-1 w-full h-full">
          <CardHeader>
            <CardTitle>Document</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="task-1" />
                  <Label htmlFor="task-1" className="font-medium">
                    File motion for summary judgment
                  </Label>
                </div>
                <div className="text-sm text-muted-foreground">Due: June 10</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="task-2" />
                  <Label htmlFor="task-2" className="font-medium">
                    Prepare witness list
                  </Label>
                </div>
                <div className="text-sm text-muted-foreground">Due: June 30</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="task-3" />
                  <Label htmlFor="task-3" className="font-medium">
                    Review expert reports
                  </Label>
                </div>
                <div className="text-sm text-muted-foreground">Due: July 15</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
