import React from 'react'

const TextField = ({ label, name, value, onChange, error, type }) => {
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '')
    }
    const HandleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <>
            <div className="mb-4">
                <label htmlFor={name}>{label}</label>
                <div className="input-group has-validation">
                    <input
                        className={getInputClasses()}
                        id={name}
                        type={type}
                        value={value}
                        name={name}
                        onChange={HandleChange}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
            </div>
        </>
    )
}

TextField.defaultProps = {
    type: 'text'
}

export default TextField