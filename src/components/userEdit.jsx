import React, {useState, useEffect} from "react";
import { useHistory, Link } from "react-router-dom";
import TextField from "./textField";
import { validator } from "./utils/utils";
import { localStorageId } from "./utils/utils"

const UserEdit = () => {
    const [data, setData] = useState({firstName: '', lastName: '', birthdayYears: '', portfolio: ''})
    const [errors, setErrors] = useState({})
    const [isCreatedUser, setIsCreatedUser] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const dataLocalStorage = localStorage.getItem(localStorageId)
        if (dataLocalStorage) {
            setData(JSON.parse(dataLocalStorage))
            setIsCreatedUser(true)
        }
    }, [])

    const validatorConfig = {
        firstName: {
            isRequired: {
                message: 'First name is required'
            }
        },
        lastName: {
            isRequired: {
                message: 'Last name is required'
            }
        },
        birthdayYears: {
            isRequired: {
                message: 'Year of birth is required'
            },
            isBirthDate: {
                message: 'Add correct number of birth year'
            }
        },
        portfolio: {
            isRequired: {
                message: 'Portfolio link is required'
            },
            isLink: {
                message: 'Portfolio must be link'
            }
        }
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    useEffect(() => {
        validate()
    }, [data])
    const isValid = Object.keys(errors).length === 0
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return

        localStorage.setItem(localStorageId, JSON.stringify(data))
        alert('Обновлено!')
        history.push('/')
    }
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState, [target.name]: target.value
        }))
        console.log(data)
    }
    return (
        <div className="container mt-4 mb-4">
            {isCreatedUser ? <h2>Edit your card</h2> : <h2>Create new card</h2>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Add your first name"
                    name="firstName"
                    id="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <TextField
                    label="Add your last name"
                    name="lastName"
                    id="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <TextField
                    label="Add your year birthday"
                    name="birthdayYears"
                    id="birthdayYears"
                    value={data.birthdayYears}
                    type="number"
                    onChange={handleChange}
                    error={errors.birthdayYears}
                />
                <TextField
                    label="Add your portfolio link"
                    name="portfolio"
                    id="portfolio"
                    value={data.portfolio}
                    onChange={handleChange}
                    error={errors.portfolio}
                />
                <button
                    disabled={!isValid}
                    className="btn bg-primary"
                >
                    {isCreatedUser ? "Edit" : "Create"}
                </button>
                { isCreatedUser && <Link className="btn btn-secondary ms-2"  to={"/"}>Go back</Link> }
            </form>
        </div>
    )
}

export default UserEdit
