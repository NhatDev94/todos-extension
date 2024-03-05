const listEl = document.querySelector('#list')
const inputEl = document.querySelector('.add_todo input')
const btnEl = document.querySelector('.add_todo button')

const setData = (data) => {
    localStorage.setItem('todos', JSON.stringify(data))
}

const handleAddTodo = (value) => {
    const list = JSON.parse(localStorage.getItem('todos')) || []
    const newList = [...list, {
        id: Math.random(),
        name: value,
        isCompleted: false
    }]
    setData(newList)
    inputEl.value = ''
    renderTodos()
}

const handleInput = (e) => {
    if (e.key === 'Enter') {
        e.target.value && handleAddTodo(e.target.value)
    }
}

const handleClickBtn = () => {
    const value = inputEl.value
    value && handleAddTodo(value)
}

const handleToggleCompleted = (list, todo) => {
    const newList = list?.map(item => {
        if (item?.id === todo?.id) {
            return { ...item, isCompleted: !item?.isCompleted }
        }
        return item
    })
    setData(newList)
    renderTodos()
}

const handleDeleteTodo = (list, todo) => {
    const newList = list?.filter(item => item?.id !== todo?.id)
    setData(newList)
    renderTodos()
}

const renderTodos = () => {
    listEl.innerHTML = null

    const list = JSON.parse(localStorage.getItem('todos')) || []

    list?.forEach((todo, i) => {
        const divEl = document.createElement('div')
        const h4El = document.createElement('h4')
        const pEl = document.createElement('p')

        h4El.addEventListener('click', () => handleToggleCompleted(list, todo))

        pEl.addEventListener('click', () => handleDeleteTodo(list, todo))

        divEl.classList.add('item')

        h4El.textContent = todo?.name
        if (todo?.isCompleted) h4El.classList.add('completed')

        pEl.textContent = 'X'

        divEl.appendChild(h4El)
        divEl.appendChild(pEl)

        listEl.appendChild(divEl)
    })
}

inputEl.addEventListener('keypress', handleInput)
btnEl.addEventListener('click', handleClickBtn)

renderTodos()

