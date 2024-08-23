'use client'

import { BarChart } from '@mui/x-charts'
import { DatasetType } from '@mui/x-charts/internals'

interface BarChartCompletionProps {
    datasets: DatasetType
}

const BarChartCompletion = ({ datasets }: BarChartCompletionProps) => {
    const valueFormatter = (value: number | null) => `${value}%`

    return (
        <BarChart
            dataset={datasets}
            series={[
                {
                    dataKey: 'completion',
                    label: 'Completed Task',
                    valueFormatter,
                },
            ]}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'category',
                    label: 'Category',
                },
            ]}
            yAxis={[
                {
                    label: 'percentage (%)',
                    min: 0,
                    max: 100,
                },
            ]}
            height={375}
            className="min-w-[48rem] sm:min-w-full"
        />
    )
}

export default BarChartCompletion
