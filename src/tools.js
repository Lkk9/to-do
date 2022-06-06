export const tools = {
  getBlankTask: (id, arrayOfTasks=[]) => {
    return {
      id: id,
      tasks: arrayOfTasks // {value: str, checked: bool}
    }
  },
  rewriteData: (key, f) => localStorage.setItem(key, JSON.stringify(f(JSON.parse(localStorage.getItem(key))))),
  getData: (key) => JSON.parse(localStorage.getItem(key)),
  getPageKey: (index) => 'page-'+index
}
