'use client'

import Clock from 'react-live-clock'

const LiveClock = () => {
    return (
        <Clock
            format={'HH:mm'}
            ticking={true}
            className="text-5xl font-semibold"
        />
    )
}

export default LiveClock
