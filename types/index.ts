export type Client = {
  id: string
  first_name: string
  last_name: string
  createdAt: Date
  updatedAt: Date
  email: string
  telephone: string
  attorneyId: string
  xata_id: string
  xata_version: number
  xata_createdat: Date
  xata_updatedat: Date
}

export type TCase = {
  id: string
  case_number: string
  createdAt: Date
  updatedAt?: Date
  defendants: string[]
  plaintiffs: string[]
  court?: string
  fileHash?: string
  fileUrl?: string
  owner?: string
  client: Client
  clientId: string
  attorneyId: string
  summary?: string
  xata_id: string
  xata_version: number
  xata_createdat: Date
  xata_updatedat: Date
}
