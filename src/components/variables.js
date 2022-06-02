function blankTask(id, arrayOfTasks=[]) {
  return {
    id: id,
    tasks: arrayOfTasks // {value: str, checked: bool}
  }
}

export default blankTask
