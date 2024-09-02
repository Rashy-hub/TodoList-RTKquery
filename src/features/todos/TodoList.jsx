import {
    useGetTodosQuery,
    useDeleteTodoMutation,
    useCompleteTodoMutation,
    useAddTodoMutation,
} from "../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faUpload,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TodoModal from "./TodoModal";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");
    const [selectedTodo, setSelectedTodo] = useState(null);

    const {
        data: todosData,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [completeTodo] = useCompleteTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodo({ text: newTodo, completed: false });
            setNewTodo("");
        }
    };

    const openModalHandler = (id) => {
        setSelectedTodo(id);
    };

    const handleCloseModal = () => {
        setSelectedTodo(null);
    };

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess && !selectedTodo) {
        console.log(todosData[0]._id);
        /*    new Array(todosData).forEach((item) => {
            console.log(item[index]);
            index++;
        }); */

        // todos = todosData?.todos;
        content = todosData.map((todo) => {
            return (
                <article key={todo._id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo._id}
                            onChange={() =>
                                completeTodo({
                                    ...todo,
                                    completed: !todo.completed,
                                })
                            }
                        />
                        <label className="mylabel" htmlFor={todo._id}>
                            {todo.text}
                        </label>
                    </div>
                    <div className="mybuttons">
                        <button
                            className="trash"
                            onClick={() => openModalHandler(todo._id)}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <button
                            className="trash"
                            onClick={() => deleteTodo({ id: todo._id })}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </article>
            );
        });
    } else if (isError) {
        content = <p>{error.message || "An error occurred"}</p>;
    } else if (selectedTodo) {
        content = (
            <TodoModal idTodo={selectedTodo} onClose={handleCloseModal} />
        );
    }

    return (
        <main>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-todo">Enter a new todo item</label>
                <div className="new-todo">
                    <input
                        type="text"
                        id="new-todo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter new todo"
                    />
                </div>
                <button className="submit">
                    <FontAwesomeIcon icon={faUpload} />
                </button>
            </form>
            {content}
        </main>
    );
};

export default TodoList;
