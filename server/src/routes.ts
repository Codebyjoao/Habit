import { FastifyInstance } from 'fastify'
import {z} from 'zod'
import dayjs from 'dayjs'
import {prisma} from './lib/prisma'

export async function appRoutes(app: FastifyInstance){
    app.get('/day', async (request) => {
        const getDayParams = z.object({
          date: z.coerce.date(),
        })
    
        const { date } = getDayParams.parse(request.query)
    
        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')
    
        const possibleHabits = await prisma.habit.findMany({
          where: {
            created_at: {
              lte: date,
            },
            weekDays: {
              some: {
                week_day: weekDay,
              }
            }
          },
        })
    
        const day = await prisma.day.findFirst({
          where: {
            date:"2023-01-02T03:00:00.000Z" , // parsedDate.toDate()
          },
          include: {
            dayHabits: true,
          }
        })

        const completedHabits = day?.dayHabits.map(dayHabit =>{
            return dayHabit.habit_id
        })      

        return{
            possibleHabits,
            completedHabits
        }
    })
}
  