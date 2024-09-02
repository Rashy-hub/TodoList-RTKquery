import React from "react";
import { useGetTodoByIdQuery } from "../api/apiSlice"; // Ensure this hook is defined in your apiSlice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const TodoModal = ({ idTodo, onClose }) => {
    const { data: todo, isLoading, isSuccess } = useGetTodoByIdQuery(idTodo);

    if (isLoading) return <p>Loading ...</p>;
    if (isSuccess) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <article key={todo._id}>
                        <div className="todo">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                id={todo._id}
                                readOnly
                            />
                            <label htmlFor={todo._id}>{todo.text}</label>
                        </div>
                        <button className="close" onClick={onClose}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </article>
                </div>
            </div>
        );
    }

    return <div>Could not fetch todo details.</div>;
};

export default TodoModal;
