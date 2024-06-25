// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const InputField = ({id, label, type, onChange, value}) => {
  return (
    <div className='flex flex-col gap-y-2'>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} onChange={onChange} value={value} className='px-3 py-1 border border-neutral-200 rounded-md' required />
    </div>
  )
}

export default InputField