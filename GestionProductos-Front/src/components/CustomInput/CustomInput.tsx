import { Controller, type Control, type FieldError } from "react-hook-form"
import type { CreateProductModel } from "../../models/productSchema"
import './CustomInput.css'

interface Props{
  name: keyof CreateProductModel,
  control: Control<CreateProductModel>,
  label: string,
  type?: string,
  error: FieldError | undefined
}

export const CustomInput = ({name, control, label, type, error} : Props) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <Controller 
        name={name}
        control={control}
        render={({field}) => 
          <input 
            id={name}
            type={type ?? "text"}
            {...field}
            onChange={ (e) => {
              const value = e.target.value;
              if(type === 'number') field.onChange(value === '' ? '' : parseFloat(value));
              else field.onChange(value)
            }}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder={label}
          />
        }
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  )
}
