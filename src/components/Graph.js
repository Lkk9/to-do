import React, {useRef, useEffect} from 'react';
import {tools} from '../tools.js';

const Graph = () => {

  const graphRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const canvas = graphRef.current
      const ctx = canvas.getContext('2d')

      // vars
      const dense = 1
      const width = canvas.offsetWidth*dense
      const height = canvas.offsetHeight*dense
      const sideSize = Math.min(width, height)/600

      const scale = .9
      const padding = {
        x: (1-scale)*width/2,
        y: (1-scale)*height/2
      }

      canvas.width = width
      canvas.height = height
      const data = tools.getScore()

      const dataPoints = tools.convertScoreData(data)
      const totalPoints = dataPoints.length
      const minValue = Math.min(...dataPoints)
      const maxValue = Math.max(...dataPoints)
      const deltaValue = maxValue - minValue

      const getPoint =(x,y)=> {
        return {
          x: x*(width/(totalPoints-1))*scale+padding.x,
          y: height-(y-minValue+1)*height/(deltaValue+2)*scale-padding.y
        }
      }

      const tension = .4

      const getControlPoints = (p0,p1,p2,t) => {
          var d01=Math.sqrt(Math.pow(p1.x-p0.x,2)+Math.pow(p1.y-p0.y,2))
          var d12=Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2))
          var fa=t*d01/(d01+d12)
          var fb=t*d12/(d01+d12)
          var p1x=p1.x-fa*(p2.x-p0.x)
          var p1y=p1.y-fa*(p2.y-p0.y)
          var p2x=p1.x+fb*(p2.x-p0.x)
          var p2y=p1.y+fb*(p2.y-p0.y)
          return [{x:p1x,y:p1y},{x:p2x,y:p2y}]
      }

      drawGridLines()
      function drawGridLines() {
        // grid lines
        const gridLinesWidth = 1
        *sideSize
        ctx.lineWidth = gridLinesWidth
        ctx.lineJoin = 'bevel'
        ctx.lineCap = 'butt'
        ctx.strokeStyle = tools.palette.dark
        ctx.fillStyle = tools.palette.dark

        // grid dots
        for (let i = minValue-1; i <= maxValue+1; i++) {
          for (let j = 0; j < totalPoints; j++) {
            if (i !== 0) {
              const p = getPoint(j, i)
              ctx.beginPath()
              ctx.arc(p.x, p.y, gridLinesWidth, 0, 2*Math.PI)
              ctx.fill()
            }
          }
        }
        // line y=0
        (()=>{
          const p0 = getPoint(0, 0)
          const p1 = getPoint(totalPoints-1, 0)
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.stroke()
        })()

      }

      drawGraph()
      function drawGraph() {

        const graphLinesWidth = 10
        *sideSize
        const points = []
        const controlPoints = []
        for (let i = 0; i < totalPoints; i++) {
          const currentPoint = {x:i, y:dataPoints[i]}
          points.push(currentPoint)
          if (i === 0) {
            controlPoints.push(currentPoint)
          } else if (i >= 2) {
            const pointsLen = points.length
            controlPoints.push(...getControlPoints(points[pointsLen-3], points[pointsLen-2], points[pointsLen-1], tension))
          }
          if (i === totalPoints-1) {
            controlPoints.push(currentPoint)
          }
        }

        drawGraphLines()
        function drawGraphLines() {
          // graph
          ctx.lineWidth = graphLinesWidth
          ctx.lineJoin = 'round'
          ctx.lineCap = 'round'

          const getControlPointIndexes = i => [2*(i-1), 2*i-1]

          // line
          for (let i = points.length-1; i >= 1; i--) {
            const p0 = getPoint(points[i-1].x, points[i-1].y)
            const p1 = getPoint(points[i].x, points[i].y)
            const controlPointsIndexes = getControlPointIndexes(i)
            const currentControlPoints = {
              cp1: controlPoints[controlPointsIndexes[0]],
              cp2: controlPoints[controlPointsIndexes[1]]
            }
            const cp1 = getPoint(currentControlPoints.cp1.x, currentControlPoints.cp1.y)
            const cp2 = getPoint(currentControlPoints.cp2.x, currentControlPoints.cp2.y)

            ctx.strokeStyle = data[i]===null ? tools.palette.light : p1.y-p0.y > 0 ? tools.palette.red : tools.palette.blue
            ctx.beginPath()
            ctx.moveTo(p0.x, p0.y)
            ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p1.x, p1.y)
            ctx.stroke()
          }
        }

        drawGraphDots()
        function drawGraphDots() {
          // dots
          ctx.lineWidth = graphLinesWidth/2.5
          for (let i = 0; i < points.length; i++) {
            const p = getPoint(points[i].x, points[i].y)

            ctx.strokeStyle = tools.palette.dark
            ctx.beginPath()
            ctx.arc(p.x, p.y, graphLinesWidth/1.5, 0, 2*Math.PI)
            ctx.stroke()
            ctx.fillStyle = tools.palette.white
          }
        }
      }


    }
    window.addEventListener('resize', update)
    update()
    return () => window.removeEventListener('resize', update)
  }, [])

  return <div className="Graph-container">
    <div className="Graph">
      <canvas id="graph" ref={graphRef}></canvas>
    </div>
  </div>
}

export default Graph;
