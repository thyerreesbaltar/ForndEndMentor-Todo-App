import { useState } from 'react';
import './List.scss';
import IconCross from '../../Assets/icon-cross.svg'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const List = ({ listTodo, setListTodo }) => {
    const [filterViewTodo, setFilterViewTodo] = useState("ALL")

    //Mudar o status do Todo para completo ou em progresso
    const handleStatusTodo = (id) => {
        const statusTodoProgress = "todo-in-progress"
        const statusTodoCompleted = "todo-completed"

        setListTodo(listTodo.map((todoItem) => {
            if (todoItem.id === id) {
                if (todoItem.status === statusTodoProgress) {
                    todoItem.status = statusTodoCompleted
                } else if (todoItem.status === statusTodoCompleted) {
                    todoItem.status = statusTodoProgress
                }
            }
            return todoItem
        }))
    }

    const handleDeleteTodo = (id) => {
        setListTodo(listTodo.filter((todoItem) => {
            if (todoItem.id !== id)
                return todoItem
        }
        ))
    }

    const handleDeleteAllTodoCompleted = () => {
        setListTodo(listTodo.filter((todoItem) => {
            if (todoItem.status !== "todo-completed")
                return todoItem
        }))
    }

    //Salva as modificações da ordenação de itens na lista do Todos
    const handleOnDragEnd = result => {

        if (!result.destination) {
            return;
        }

        const todos = Array.from(listTodo);
        const [reorderedTodos] = todos.splice(result.source.index, 1)
        todos.splice(result.destination.index, 0, reorderedTodos)

        setListTodo(todos)
    }

    const liTodo = (todoItem, index) => {
        return (
            <Draggable key={todoItem.id} draggableId={todoItem.id} index={index}>
                {
                    (provided) => (

                        <li className={todoItem.status} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                            <div onClick={() => handleStatusTodo(todoItem.id)} />
                            <span>
                                {todoItem.todo}
                            </span>
                            <button onClick={() => handleDeleteTodo(todoItem.id)}>
                                <img src={IconCross} />
                            </button>
                        </li>
                    )
                }
            </Draggable>
        )
    }

    return (
        <main className='list'>
            <DragDropContext onDragEnd={handleOnDragEnd}>

                <Droppable droppableId='listTodo'>
                    {
                        (provided) => (

                            <ul className='content-list listTodo' {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    listTodo?.map((todoItem, index) => {
                                        if (filterViewTodo === "ACTIVE" && todoItem.status === "todo-in-progress") {
                                            return (
                                                liTodo(todoItem, index)
                                            )
                                        }
                                        else if (filterViewTodo === "COMPLETED" && todoItem.status === "todo-completed") {
                                            return (
                                                liTodo(todoItem, index)
                                            )
                                        }
                                        else if (filterViewTodo === "ALL") {
                                            return (
                                                liTodo(todoItem, index)
                                            )
                                        }
                                    })
                                }
                                {provided.placeholder}
                            </ul>
                        )
                    }
                </Droppable>
            </DragDropContext>

            <div className='footer-list'>
                <span>
                    {listTodo.length} items left
                </span>
                < ul className='footer-option-filter-todo'>
                    <li
                        className={`filter-${filterViewTodo === "ALL" && "active"}`}
                        onClick={() => { setFilterViewTodo("ALL") }}>
                        All
                    </li >
                    <li
                        className={`filter-${filterViewTodo === "ACTIVE" && "active"}`}
                        onClick={() => { setFilterViewTodo("ACTIVE") }}>
                        Active
                    </li >
                    <li
                        className={`filter-${filterViewTodo === "COMPLETED" && "active"}`}
                        onClick={() => { setFilterViewTodo("COMPLETED") }}>
                        Completed
                    </li >
                </ul>
                <button onClick={() => { handleDeleteAllTodoCompleted() }}>
                    Clear Completed
                </button>
            </div>
        </main>
    )
}

export default List;