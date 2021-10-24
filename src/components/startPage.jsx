import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { localStorageId } from './utils/utils'
import UserCard from "./userCard";

const StartPage = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        const storageData = localStorage.getItem(localStorageId)
        if (storageData) {
            setData(JSON.parse(storageData))
        }
    }, [])

    // to boolean type
    const isCreatedUser = !!Object.keys(data).length
    return (
        <div className="container mt-4">
            <h2>Student card</h2>
            {isCreatedUser
                ?  Object.keys(data).map( label => <UserCard key={label} label={label} value={ data[label] }/> )
                : <p>No data student</p>}
            <Link className="btn btn-primary" to={"/user"}>{
                isCreatedUser ? "Edit" : "Add"
            }</Link>
        </div>
    )
}

export default StartPage