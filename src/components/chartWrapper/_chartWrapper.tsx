import './_chartWrapper.less'

import React, { FC } from 'react'

import { useSelector } from 'react-redux'

import Chart from 'chart.js'

import { CSSVariableState, RootState } from '@/type/state'

import { ChartWrapperInterface } from './chartWrapperType'

const ChartWrapper: FC<ChartWrapperInterface> = ({ handleChangeGraphController }: ChartWrapperInterface) => {
  const graphRef = React.useRef<null | HTMLCanvasElement>(null)

  const [graphNotRender, setGraphNotRender] = React.useState<boolean>(false)

  const cssVariableState = useSelector((s: RootState): CSSVariableState => s.cssVariableState)

  React.useEffect(() => {
    if (graphRef && !graphNotRender) {
      setGraphNotRender(true)
      const graph = new Chart(graphRef?.current || '', {
        type: 'line',
        data: {
          labels: [''],
          datasets: [
            {
              label: '',
              fill: cssVariableState.primary,
              borderColor: cssVariableState.primary,
              data: [0],
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: cssVariableState.darkGray,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: cssVariableState.darkGray,
                },
              },
            ],
          },
        },
        //   options,
      })
      if (handleChangeGraphController) {
        handleChangeGraphController(graph)
      }
    }
  }, [graphRef, graphNotRender])
  return (
    <div className="chartWrapper">
      <canvas id="graphChart" className="chart" ref={graphRef} height="400" />
    </div>
  )
}
export default ChartWrapper
