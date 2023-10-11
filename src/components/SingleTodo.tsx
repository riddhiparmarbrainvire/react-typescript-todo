import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";

type Props = {
  y: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ y, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(y.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos(todos.map(g => (g.id === id ? { ...g, isDone: !g.isDone } : g)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(d => d.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <form className="todos__single" onSubmit={e => handleEdit(e, y.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={e => {
            setEditTodo(e.target.value);
          }}
          className="todos__single--text"
        />
      ) : y.isDone ? (
        <s className="todos__single--text">{y.todo}</s>
      ) : (
        <span className="todos__single--text">{y.todo}</span>
      )}

      <div>
        <span className="icon">
          <AiFillEdit
            onClick={() => {
              if (!edit && !y.isDone) {
                setEdit(!edit);
              }
            }}
          />
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(y.id)} />
        </span>
        <span className="icon">
          <MdOutlineDownloadDone onClick={() => handleDone(y.id)} />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
