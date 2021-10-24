import React from "react";

const UserCard = ({label, value}) => {
    return (
       <div className="container mt-4 mb-4">
           <p><b>{label}:</b> {value}</p>
       </div>
    )
}

export default UserCard