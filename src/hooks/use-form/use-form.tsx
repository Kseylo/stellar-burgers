import React, { useState } from 'react'

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return { values, handleChange, setValues }
}
