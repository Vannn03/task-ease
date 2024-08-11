'use client'

import Clock from 'react-live-clock'

const LiveClock = () => {
    return <Clock format={'HH:mm'} ticking={true} className="font-semibold" />
}

export default LiveClock
