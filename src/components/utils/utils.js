export const localStorageId = 'dataLocalStorage'

export const calculateAge = (year) => {
  return new Date().getFullYear() - Number(year)
}

export function validator(data, config) {
    const errors = {}
    function validate(validateMethod, data, config) {
        let statusValidate
        switch (validateMethod) {
        case 'isRequired': {
             statusValidate = data.trim() === ''
            break
        }
        case 'isBirthDate': {
             const numberRegExp = /^[12][0-9]{3}$/g
                    statusValidate = !numberRegExp.test(data) || data > new Date().getFullYear()
             break
        }
        case 'isLink': {
                const urlRegExp = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g
                statusValidate = !urlRegExp.test(data)
                break
              }
        default:
            break
        }
        if (statusValidate) return config.message
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    return errors
}