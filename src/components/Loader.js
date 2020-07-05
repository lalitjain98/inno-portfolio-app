import React from 'react'

export default function Loader() {
    return (
        <>
            <div className="row justify-content-center align-items-center loader-wrapper">
                <div className="loader"></div>
            </div>
            <div className="row justify-content-center align-items-center">
                Loading...
            </div>
        </>
    )
}
