import React, { useState, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

const THIS_YEAR = dayjs().year()
const YEAR_OPTIONS = [THIS_YEAR - 1, THIS_YEAR, THIS_YEAR + 1]
const THIS_MONTH = dayjs().month()
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => index)
const DISCOUNT_OPTIONS = Array.from({ length: 16 }, (_, index) => index)
const TODAY = dayjs().hour(0).second(0)

type Props = {
  setResult: React.Dispatch<React.SetStateAction<string>>
}

const Form = ({ setResult }: Props) => {
  const [year, setYear] = useState(THIS_YEAR)
  const [month, setMonth] = useState(THIS_MONTH)
  const [date, setDate] = useState(TODAY.date())
  const [discount, setDiscount] = useState(0)

  const dateOptions = useMemo(
    () =>
      Array.from(
        {
          length: dayjs().month(month).daysInMonth(),
        },
        (_, index) => index,
      ),
    [month],
  )

  const handleSubmit = () => {
    const endDate = dayjs()
      .year(year)
      .month(month)
      .date(date)
      .add(112, 'day')
      .subtract(discount, 'day')
      .subtract(1, 'day')
    if (endDate.isBefore(dayjs())) {
      setResult(`你已經在 ${endDate.format('YYYY 年 MM 月 DD 日')}退伍了！`)
    } else {
      setResult(
        `你將會在 ${endDate.format('YYYY 年 MM 月 DD 日')}回歸自由，\n距離那天還有 ${endDate.diff(
          TODAY,
          'day',
        )} 天！`,
      )
    }
  }

  useEffect(() => {
    setYear(Number(localStorage.getItem('year')) || THIS_YEAR)
    setMonth(Number(localStorage.getItem('month')) || THIS_MONTH)
    setDate(Number(localStorage.getItem('date')) || TODAY.date())
    setDiscount(Number(localStorage.getItem('discount')) || 0)
  }, [])

  useEffect(() => {
    localStorage.setItem('year', String(year))
  }, [year])

  useEffect(() => {
    localStorage.setItem('month', String(month))
  }, [month])

  useEffect(() => {
    localStorage.setItem('date', String(date))
  }, [date])

  useEffect(() => {
    localStorage.setItem('discount', String(discount))
  }, [discount])

  return (
    <form className="form">
      <div className="form__date__inputs">
        <label className="form__date__inputs__label" htmlFor="year">
          入伍日期
        </label>
        <select
          className="form__date__inputs__input"
          id="year"
          name="year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {YEAR_OPTIONS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        年
        <select
          className="form__date__inputs__input"
          name="month"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {MONTH_OPTIONS.map((month) => (
            <option key={month} value={month}>
              {month + 1}
            </option>
          ))}
        </select>
        月
        <select
          className="form__date__inputs__input"
          name="date"
          value={date}
          onChange={(e) => setDate(Number(e.target.value))}
        >
          {dateOptions.map((date) => (
            <option key={date}>{date + 1}</option>
          ))}
        </select>
        日
      </div>
      <div className="form__date__inputs">
        <label className="form__date__inputs__label" htmlFor="discount">
          折抵天數
        </label>
        <select
          className="form__date__inputs__input"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        >
          {DISCOUNT_OPTIONS.map((discount) => (
            <option key={discount}>{discount}</option>
          ))}
        </select>
      </div>
      <div className="form__submit" onClick={handleSubmit}>
        計算
      </div>
    </form>
  )
}

export default Form
