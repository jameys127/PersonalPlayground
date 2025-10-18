import { useState, useEffect } from 'react'
import './DashFooter.css'

const DashFooter = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000);

        return function cleanup() {
            clearInterval(timer);
        }
    })

    return (
        <div className='dash-footer-container'>
            <footer className="dash-footer">
                <div className='dash-footer-time'>
                    <p className='title'>Time:</p>
                    <p className='time'>{date.toLocaleTimeString()}</p>
                </div>
                <div className='dash-footer-date'>
                    <p className='title'>Date:</p>
                    <p className='date'>{date.toLocaleDateString()}</p>
                </div>
            </footer>
        </div>
    )
}

export default DashFooter
