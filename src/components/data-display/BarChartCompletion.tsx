'use client'

import { BarChart, blueberryTwilightPalette } from '@mui/x-charts'
import { DatasetType } from '@mui/x-charts/internals'

interface BarChartCompletionProps {
    datasets: DatasetType
}

const BarChartCompletion = ({ datasets }: BarChartCompletionProps) => {
    const valueFormatter = (value: number | null) => {
        if (value === null || isNaN(value)) return '0%'
        return `${value.toFixed(2)}%` // Format to 2 decimal places
    }

    return (
        <BarChart
            dataset={datasets}
            colors={blueberryTwilightPalette}
            series={[
                {
                    dataKey: 'completionPercentage',
                    label: 'Completion %',
                    valueFormatter,
                },
            ]}
            xAxis={[
                {
                    label: 'Last 5 days',
                    scaleType: 'band',
                    dataKey: 'day',
                    tickPlacement: 'middle',
                    tickLabelPlacement: 'middle',
                },
            ]}
            yAxis={[
                {
                    label: 'Completion Percentage',
                    min: 0,
                    max: 100,
                },
            ]}
            height={315}
            className="w-full"
        />
    )
}

export default BarChartCompletion
