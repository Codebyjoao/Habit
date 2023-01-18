import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    await prisma.habit.deleteMany()

    await prisma.habit.create({
        data:{
            title:'Beber 2L de água',
            Created_at: new Date('2023-01-18T00:00:00')
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })