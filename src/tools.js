export const tools = {
  getBlankTask: (id, arrayOfTasks=[]) => {
    return {
      id: id,
      tasks: arrayOfTasks // {value: str, checked: bool}
    }
  },
  rewriteData: (key, f) => localStorage.setItem(key, JSON.stringify(f(JSON.parse(localStorage.getItem(key))))),
  getData: (key) => JSON.parse(localStorage.getItem(key)),
  getPageKey: (index) => 'page-'+index,
  palette: (()=>{
    const rootSelector = window.getComputedStyle(document.querySelector(':root'))
    const getColor = (colorName) => rootSelector.getPropertyValue(`--color-${colorName}`)
    return {
      blue: getColor('blue'),
      red: getColor('red'),
      light: getColor('light'),
      dark: getColor('dark'),
      white: getColor('white')
    }
  })(),
  getScore: () => {
    let score = JSON.parse(localStorage.getItem('score'))
    if (!score) {
      score = [0]
      localStorage.setItem('score', JSON.stringify(score))
    }
    return score
  },
  writeScore: (value) => {
    let score = JSON.parse(localStorage.getItem('score'))
    if (!score) {
      score = [0]
      localStorage.setItem('score', JSON.stringify(score))
    }
    score.push(value)
    localStorage.setItem('score', JSON.stringify(score))
  },
  convertScoreData: (data) => {
    const dataPoints = []
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i]
      if (i > 0 && currentData===null) {
        dataPoints.push(dataPoints[i-1])
      } else {
        dataPoints.push(currentData)
      }
    }
    return dataPoints
  }
}
