import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todolistsId:string, id: string) {
        let filteredTasks = tasks[todolistsId].filter(t => t.id !== id);
        console.log({[todolistsId]:filteredTasks});
        debugger
       // if(filteredTasks)
           // setTasks({[todolistsId]:filteredTasks});
    }

    function addTask(todolistsId:string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks,[todolistsId]:tasks[todolistsId].concat(newTask)};
        setTasks(newTasks);
    }

    function changeStatus(todolistsId:string, taskId: string, isDone: boolean) {
        let task = tasks[todolistsId].find(t => t.id === taskId);
        if (task) {
        console.log(task)
            task.isDone = isDone;
        setTasks({...tasks,[todolistsId]:tasks[todolistsId]});
        }
        // //
    }


    let tasksForTodolist = tasks;


    function changeFilter(value: FilterValuesType, todolistsId: string) {
        const el = todolists.find(t => t.id === todolistsId)
        if (el) el.filter = value
        setTodolists([...todolists])
    }


    return (
        <div className="App">
            {
                todolists.map(t => {
                    let tasksForTodolist = tasks[t.id];

                    if (t.filter === "active") {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                    }
                    if (t.filter === "completed") {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            key={t.id}
                            todolistsId={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
