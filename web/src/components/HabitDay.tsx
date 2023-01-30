import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx'
import dayjs from 'dayjs';
import { HabitList } from './HabitList';
import { useState } from 'react';
interface HabitDayProps{
  date: Date
  defaultcompleted?: number
  amount?: number
}
 
export function HabitDay( {defaultcompleted = 0, amount = 0, date}: HabitDayProps){
  const [completed, setcompleted] = useState(defaultcompleted)
  const CompletedPercentage =  amount > 0 ? Math.round((completed/amount) * 100): 0

  function handleCompletedChanged(completed: number){
    setcompleted(completed)
  }

  const dayAndMonth = dayjs(date).format("DD/MM")
  const dayOfWeek = dayjs(date).format('dddd')

  return(
    <Popover.Root>
      <Popover.Trigger 
      className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors',{
        'bg-zinc-900 border-zinc-800': CompletedPercentage === 0,
        'bg-violet-900 border-violet-700': CompletedPercentage > 0 && CompletedPercentage < 20,
        'bg-violet-800 border-violet-600': CompletedPercentage >= 20 && CompletedPercentage < 40,
        'bg-violet-700 border-violet-500': CompletedPercentage >= 40 && CompletedPercentage < 60,
        'bg-violet-600 border-violet-500': CompletedPercentage >= 60 && CompletedPercentage < 80,
        'bg-violet-500 border-violet-400': CompletedPercentage >= 80,
      })}
      />

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col '>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
          <ProgressBar progress={CompletedPercentage}/>
          <HabitList date={date} onCompletedChanges ={handleCompletedChanged}/>

          <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
    )
}