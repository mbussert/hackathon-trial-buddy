import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  console.log('==================================')
  console.log('Seeding Court Table')
  console.log('==================================')
  await prisma.court.createMany({
    data: [
      {
        name: 'Wayne County Circuit Court',
        address1: '2 Woodward Ave',
        address2: '',
        city: 'Detroit',
        state: 'MI',
        zipcode: '48226',
        telephone: '313-224-0157',
      },
      {
        name: 'Oakland County Circuit Court',
        address1: '1200 N Telegraph Rd',
        address2: '',
        city: 'Pontiac',
        state: 'MI',
        zipcode: '48341',
        telephone: '248-858-0344',
      },
    ],
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
