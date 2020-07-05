import React from 'react'

// only text inputs supported as of now
function LabeledInput({name, value, onChange, id, label, type='text', wrapperClass, labelClass, inputClass, error, inputProps = {}, validations = {}}) {

    const [touched, setTouched] = React.useState(false);

    const commonProps = {
        className: `input ${inputClass}`,
        name, 
        value, 
        id, 
        onChange: e => onChange(name, e.target.value),
        inputProps,
    }

    return (
        <div className={`label-input-wrapper ${wrapperClass}`}>
            <label htmlFor={name} className={`label ${labelClass}`}>{`${label} ${validations.required ? '*' : ''}`}</label>
            {
                (type !== 'textarea') ? (
                    <input 
                        type={type}
                        onFocus={() => setTouched(true)}
                        onBlur={() => setTouched(false)}
                        {...commonProps}
                    />
                ) : (
                    <textarea
                        rows={5}
                        {...commonProps}
                    ></textarea>
                )
            }
            <div className="error-text">{error}</div>
        </div>
    )
}

export default LabeledInput
