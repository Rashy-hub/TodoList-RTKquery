import { useGetTodoByIdQuery } from '../api/apiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const TodoModal = ({ idTodo, onClose }) => {
    const { data: todo, isLoading, isSuccess } = useGetTodoByIdQuery(idTodo)

    if (isLoading) return <p>Loading ...</p>
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
        )
    }

    return <div>Could not fetch todo details.</div>
}

// Prop validation
TodoModal.propTypes = {
    idTodo: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default TodoModal
