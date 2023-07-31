import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [deletedToDos, setDeletedToDos] = useState([]);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClearCompleted = () => {
    setToDos(toDos.filter((todo) => !todo.status));
  };

  const handleRestore = (todo) => {
    setToDos([...toDos, todo]);
    setDeletedToDos(deletedToDos.filter((obj) => obj.id !== todo.id));
  };

  const handleRedo = (todo) => {
    setToDos(
      toDos.map((obj) => {
        if (obj.id === todo.id) {
          obj.status = false;
        }
        return obj;
      })
    );
  };

  const handleComplete = (todo) => {
    setToDos(
      toDos.map((obj) => {
        if (obj.id === todo.id) {
          obj.status = !obj.status;
        }
        return obj;
      })
    );
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <div className="subHeading">
          <br />
          <h2>
            Whoop, it's {currentDateTime.toLocaleString('en-US', { weekday: 'long' })} ☕{' '}
          </h2>
        </div>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() => setToDos([...toDos, { id: Date.now(), text: toDo, status: false }])}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div key={obj.id} className="todo">
            <div className="left">
              <button
                className={`completeButton ${obj.status ? 'completed' : ''}`}
                onClick={() => handleComplete(obj)}
              >
                {obj.status ? 'Completed' : 'Complete'}
              </button>
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i
                onClick={() => {
                  setDeletedToDos([...deletedToDos, obj]);
                  setToDos(toDos.filter((obj2) => obj2.id !== obj.id));
                }}
                className="fas fa-times"
              ></i>
            </div>
            
          </div>
        ))}
        <h1>Completed Task</h1>
        {toDos.map((obj) => {
          if (obj.status) {
            return (
              <div key={obj.id} className="completedTodo">
                <h3>{obj.text}</h3>
                <button onClick={() => handleRedo(obj)}>Redo</button>
              </div>
            );
          }
          return null;
        })}
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
      <div className="deletedTodos">
        <h2>Deleted Items</h2>
        {deletedToDos.map((obj) => (
          <div key={obj.id} className="deletedTodo">
            <h3>{obj.text}</h3>
            <button onClick={() => handleRestore(obj)}>Restore</button>
          </div>
        ))}
        <button onClick={() => setDeletedToDos([])}>Delete All</button>
      </div>
      
    </div>
  );
}

export default App;
