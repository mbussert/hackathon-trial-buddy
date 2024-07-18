import { format } from 'date-fns'
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CaseDocsRecord, getXataClient } from '@/src/xata'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'

const xata = getXataClient()

async function getDocument(docId: string) {
  try {
    const pdfDocument = (await xata.db.case_docs.read(docId, ['*', 'document.signedUrl'])) as any

    const serializedDoc = pdfDocument.toSerializable()

    const pdfUrl = serializedDoc.document.signedUrl

    return pdfUrl as string
  } catch (e: any) {
    console.error(e.message)
  }
}

export default async function DocumentContent({ docData }: { docData: CaseDocsRecord }) {
  const uploadDate = format(docData.xata_createdat, 'PPP')

  if (!docData?.summary) {
    return (
      <h1 className="text-lg font-semibold">
        Uh oh! Looks like that document has not been summarized yet
      </h1>
    )
  }
  const { caseInformation } = docData?.summary

  const pdfUrl = await getDocument(docData.xata_id)

  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null && value !== '') {
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
                  .map(([key, value]: any) => {
                    if (value === '') {
                      return null
                    }

                    return (
                      <h3 className="py-2" key={key}>
                        <span className="font-bold underline">{camelCaseToWords(key)}:</span>{' '}
                        {renderValue(value)}
                      </h3>
                    )
                  })}
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
          <CardContent className="flex-1 h-full">
            <div className="grid gap-2 h-[90%]">
              <object data={pdfUrl} type="application/pdf" width="100%" height="100%"></object>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
