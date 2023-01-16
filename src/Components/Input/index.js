import { useState } from "react";
import "./Input.scss";

const Input = ({ listTodo, setListTodo }) => {

    const [todo, setTodo] = useState('')

    const addTodo = () => {
        //Cria um array com os ids do Todo
        const todoIdArray = listTodo.map(todo => todo.id)
        //retorna o maior id presente no array de ids do todo
        const greaterTodoId = todoIdArray.reduce((a, b) => { return Math.max(a, b) }, -Infinity)
        //caso o maior id do Todo for diferente de -Infinity será somado + 1 no maior id, caso o id do Todo for igual a -Infinity o id será igual a 0
        const id = (greaterTodoId !== -Infinity ? parseInt(greaterTodoId) + 1 : 0).toString()

        //Adiciona um novo Todo na lista
        setListTodo([...listTodo, {
            id: id,
            todo: todo,
            status: "todo-in-progress"
        }])
    }

    const onChange = event => {
        //verifica se o input não está vazio para poder inserir o novo Todo
        if (event.target.value !== "") {
            setTodo(event.target.value)
        }
    }

    const onPress = event => {
        //verifica se foi pressionada a tecla ENTER
        if (event.which === 13) {

            addTodo({ todoItem: todo })

            //Limpa o input do Todo
            event.target.value = ""
        }
    }



    return (
        <div className="newTodo">
            <div />
            <input type={"text"} onChange={onChange} onKeyUp={onPress} placeholder="Create a new todo..." required />
        </div>
    )
}

export default Input;