'use client';

import { Calendar, CalendarProps } from 'primereact/calendar';
import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

export default function DatePicker({
  handleSelectDate,
}: {
  handleSelectDate: (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => void;
}) {
  const [datetime24h, setDateTime24h] = useState<any>(null);

  const datePickerChangeHandler = (e: CalendarProps) => {
    setDateTime24h(e.value);
    handleSelectDate(e.value);
    // e.hideOnDateTimeSelect
  };

  return (
    <Calendar
      id='calendar-24h'
      value={datetime24h}
      onChange={datePickerChangeHandler}
      // onChange={(e) => setDateTime24h(e.value)}
      showTime
      hourFormat='24'
      placeholder='Select Dates'
      className='pl-[16px] text-[12px] bg-white rounded-[8px] h-[40px] w-[170px]'
      icon={<FiCalendar className='text-black h-[20px] w-[20px]'/>}
      showButtonBar
      showIcon
      iconPos='left'
      hideOnDateTimeSelect={true}
    />
  );
}
