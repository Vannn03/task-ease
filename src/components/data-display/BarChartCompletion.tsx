'use client'

import { BarChart } from '@/libs/mui'
import { useEffect, useState } from 'react'

interface BarChartCompletionProps {
    datasets: any
}

const BarChartCompletion = ({ datasets }: BarChartCompletionProps) => {
    const [dataset, setDataset] = useState<
        { category: string; completion: number }[]
    >([])

    useEffect(() => {
        setDataset(datasets)
    }, [datasets])

    const valueFormatter = (value: number | null) => `${value}%`

    return (
        <BarChart
            dataset={dataset}
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
                    label: 'Category Name',
                },
            ]}
            yAxis={[
                {
                    label: 'percentage (%)',
                    min: 0,
                    max: 100,
                },
            ]}
            height={400}
            className="w-full"
        />
    )
}

export default BarChartCompletion
