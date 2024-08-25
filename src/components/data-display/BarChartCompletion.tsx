'use client'

import { BarChart, blueberryTwilightPalette } from '@mui/x-charts'
import { DatasetType } from '@mui/x-charts/internals'

interface BarChartCompletionProps {
    datasets: DatasetType
}

const BarChartCompletion = ({ datasets }: BarChartCompletionProps) => {
    const valueFormatter = (value: number | null) => `${value}`

    return (
        <BarChart
            dataset={datasets}
            colors={blueberryTwilightPalette}
            series={[
                {
                    dataKey: 'created',
                    label: 'Task Created / Day',
                    valueFormatter,
                },
            ]}
            xAxis={[
                {
                    label: 'Last 7 days',
                    scaleType: 'band',
                    dataKey: 'day',
                },
            ]}
            yAxis={[
                {
                    label: 'Total tasks',
                    min: 0,
                    max: 50,
                },
            ]}
            height={325}
            className="w-full"
        />
    )
}

export default BarChartCompletion
