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
  return (
    <>
      <header className="flex items-center justify-between pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">{docData.fileName}</h1>
          <h1 className="text-xl ">Type: {docData.type}</h1>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus molestie
                dolor, malesuada elementum nisi volutpat a. Praesent consequat nibh tempor metus
                varius luctus. Nulla facilisi. Vestibulum tincidunt vel eros non tincidunt. Proin
                lobortis efficitur consectetur. Aenean malesuada dolor nec augue varius, ac iaculis
                lectus sodales. Suspendisse auctor finibus ex, id viverra justo euismod ac. Ut et
                tortor orci. Donec eu accumsan diam, id sodales magna. Donec dignissim blandit
                augue, sit amet varius erat placerat eget. Nunc lacinia odio eu magna tristique
                lobortis. Praesent a vulputate neque. Duis mattis, augue ut rutrum lacinia, neque
                massa feugiat nunc, in condimentum est nisl sit amet est. Sed in blandit leo, ut
                volutpat diam. Nullam placerat felis sit amet augue mollis, ut euismod nunc blandit.
                Aenean tristique sapien odio, vitae luctus lectus ultrices at. Nam urna ipsum,
                facilisis in tortor eget, vestibulum vehicula quam. Phasellus lacinia bibendum
                suscipit. Curabitur in imperdiet leo. Nunc vehicula suscipit dignissim. Praesent ac
                porta augue. Pellentesque habitant morbi tristique senectus et netus et malesuada
                fames ac turpis egestas. Praesent sapien lectus, consectetur sit amet rutrum quis,
                vestibulum quis arcu. Proin dignissim posuere tellus vel hendrerit. Cras auctor dui
                id nisl ornare, ut varius augue auctor. Duis id ligula porta, sagittis elit eu,
                blandit velit. Fusce nulla metus, vulputate in lacus eget, molestie consequat
                ligula. Aliquam viverra neque vel odio iaculis, eu convallis turpis egestas. Vivamus
                ultrices nibh vitae consectetur lacinia. Etiam vel convallis neque. Maecenas
                hendrerit tincidunt felis, a pharetra est scelerisque quis. Integer iaculis turpis
                eget nibh aliquam pellentesque. Sed tincidunt consequat nibh consequat consequat.
                Cras scelerisque mauris sit amet purus dictum, a condimentum velit vestibulum.
                Quisque vel urna ornare, mollis felis ut, elementum mi. Vivamus sit amet elit
                faucibus, tempor erat id, porta sem. In hac habitasse platea dictumst. Proin
                tristique nisl sit amet tortor lobortis blandit. Pellentesque finibus iaculis ante,
                ut mattis turpis mattis eu. Cras nec aliquet tortor, id vulputate odio. Duis
                hendrerit sed dolor nec lobortis. Suspendisse rutrum fringilla tellus vel mattis.
                Integer venenatis mi eget erat lobortis, ut porttitor metus lobortis. Vestibulum
                eget lacus velit. Duis eget leo magna. Cras ac massa tincidunt, maximus neque eget,
                tempus lorem. Integer eget eros tempus, bibendum turpis ac, tempus felis. In hac
                habitasse platea dictumst. Suspendisse et risus justo. Fusce elementum lacus id
                risus fringilla dignissim. Fusce vel mauris vitae leo consequat eleifend vitae vitae
                dolor. Praesent vitae diam eget nunc elementum volutpat. Fusce a eros in nunc
                viverra cursus. Nam sit amet dapibus turpis. Sed ac diam vel nisi accumsan luctus.
                Duis sagittis vehicula felis volutpat sollicitudin. Nunc et molestie tortor, in
                elementum mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Suspendisse sed turpis dignissim, vestibulum erat vel, auctor
                urna. In quis sodales nibh. Sed euismod, velit at consequat eleifend, lacus tortor
                pulvinar nisl, ut viverra dolor sem sed tortor. Aliquam quam nulla, blandit vel
                risus eu, dapibus consequat est. Proin sed consectetur sapien. Morbi a ipsum varius,
                porttitor quam ac, consequat lectus. Duis metus elit, dignissim fringilla
                scelerisque in, elementum suscipit elit. Vestibulum blandit fermentum dui, in
                accumsan turpis feugiat ornare. Cras efficitur purus sit amet semper auctor. Ut
                sollicitudin, quam et iaculis sodales, velit nisi condimentum turpis, eget iaculis
                libero dui in magna. Ut dolor augue, rutrum sed mauris ut, luctus commodo lectus.
                Curabitur facilisis lacus at sapien venenatis eleifend. Vestibulum quis finibus ex.
                Donec ut feugiat risus, nec pharetra enim. Sed in convallis leo. Pellentesque
                faucibus ligula et consequat ultrices. Sed posuere ex ligula, id tempus nisl
                molestie non. Praesent varius diam et mi cursus, eget scelerisque eros auctor. Proin
                imperdiet turpis quis magna interdum feugiat. Ut tempor justo velit, sed dapibus
                justo tempus sed. Cras congue diam neque. Donec mollis sapien a tempus aliquam. Cras
                ut malesuada odio. Duis ex ligula, gravida in bibendum nec, porta vitae nulla. Fusce
                aliquet venenatis sapien consectetur dignissim. Curabitur malesuada maximus
                tristique. Sed elementum purus metus, ac tristique ante tempor quis. Nulla rhoncus,
                est id suscipit sagittis, ligula lacus ornare metus, sed viverra neque risus nec
                nisi. Phasellus vulputate mi eu nibh maximus, vitae suscipit dui posuere. Vivamus
                nec lacus mauris. Nunc fermentum, ex eu aliquam suscipit, augue est ultricies
                libero, vitae porta dui eros quis justo. Donec leo arcu, rutrum non ante id,
                vehicula laoreet leo. Sed ex enim, pharetra sed est sit amet, molestie sagittis leo.
                Curabitur sollicitudin ligula non felis semper, et placerat eros viverra. Proin sit
                amet arcu ultricies, fermentum metus sed, porta tellus. Maecenas euismod lorem
                laoreet congue pellentesque. In tincidunt ligula sit amet magna porta, quis eleifend
                tortor pharetra. Nunc a est sed turpis feugiat vehicula sit amet vel leo. Nullam
                pellentesque viverra erat nec finibus. Vivamus lobortis, justo id eleifend pretium,
                magna est sagittis nunc, eget auctor purus augue vel nibh. Fusce tincidunt sodales
                odio nec rutrum. Praesent id nibh quis est viverra malesuada sed quis justo.
                Pellentesque luctus urna est, vitae mollis lacus egestas id. Fusce vitae sem
                tincidunt, fermentum odio nec, aliquet nisi. Sed lorem est, viverra quis fringilla
                eu, vehicula et mauris. Donec et varius justo. Suspendisse sit amet metus dui. Nulla
                in dignissim nunc. Donec sed quam pellentesque, ultrices libero quis, lobortis nibh.
                Nunc facilisis risus et tortor feugiat dictum. Duis iaculis porttitor risus sit amet
                egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Donec semper urna elit, eu suscipit turpis imperdiet sit amet. Mauris
                fermentum, turpis vehicula dignissim auctor, urna leo feugiat eros, nec maximus nibh
                lacus sed lectus.
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
