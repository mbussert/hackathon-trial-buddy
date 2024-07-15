import prisma from '@/prisma/client'

import { Download, Loader2, MoreHorizontal, Upload } from 'lucide-react'
import { Client, TCase } from '@/types'
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
import { NewFileModal } from './new-file-modal'

export default async function CaseContent({ caseData }: { caseData: TCase }) {
  const plaintiffsArr = caseData.plaintiffs
  const defendantsArr = caseData.defendants
  let plaintiffs = plaintiffsArr[0]
  let defendants = defendantsArr[0]

  if (plaintiffsArr.length > 1) {
    plaintiffs = `${plaintiffsArr[0]}, et al.`
  }
  if (defendantsArr.length > 1) {
    defendants = `${defendantsArr[0]}, et al.`
  }

  return (
    <>
      <header className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">{caseData.case_number}</h1>
          <h1 className="text-xl ">{`${plaintiffs} v. ${defendants}`}</h1>
        </div>
        <Button>Edit</Button>
      </header>
      <div className="grid flex-1 items-start gap-8 mt-8 p-4 sm:px-6 sm:py-0 md:grid-cols-2 lg:grid-cols-2">
        <Card className="md:col-span-1 lg:col-span-1 w-full h-full">
          <CardHeader>
            <CardTitle>Upcoming Hearings</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Motion Hearing</div>
                  <div className="text-sm text-muted-foreground">June 15, 2023 - 9:00 AM</div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Status Conference</div>
                  <div className="text-sm text-muted-foreground">July 1, 2023 - 2:00 PM</div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Trial</div>
                  <div className="text-sm text-muted-foreground">August 15, 2023 - 9:00 AM</div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-1 w-full h-full">
          <CardHeader>
            <CardTitle>To-Do Checklist</CardTitle>
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
        <Card className="md:col-span-2 lg:col-span-2 w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Files and Documents</CardTitle>
              <NewFileModal caseId={caseData.id} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Complaint.pdf</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>Complaint</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">May 1, 2023</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href="/">View Document</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 ">
                              Delete Document
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">MotionForSummaryJudgment.docx</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-600 hover:bg-emerald-600/80">Motion</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">June 5, 2023</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href="/">View Document</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 ">
                              Delete Document
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">ExpertReport.pdf</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">Witness</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">July 1, 2023</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href="/">View Document</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 ">
                              Delete Document
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
