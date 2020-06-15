import React, {useState} from 'react';
import './App.css'


interface todos {
    
    todoText:any;
    index:any
    completeTodo:(index:number)=>void;
    removeTodo:(index:number)=>void;
}


//displays the todo
const DisplayInfo: React.FC<todos> = ({todoText, index,completeTodo,removeTodo})=>{
    if (todoText.text == ""){ 
        return(<div></div>);
    }
    else{
    return(

        <div className="todo" >
                <ul onClick={()=>completeTodo(index)} style={{cursor:'alias'}}>
                    <li style={{textDecoration:todoText.isCompleted ? 'line-through':''}}> {todoText.text}</li>
                </ul>
                <button onClick={()=>removeTodo(index)}>
                    delete
                </button>
     
        </div>
    )
    }
}
interface addT{
    addTodo :(val:string)=>void;
}

//creates the inpt field and updates the value
const TodoInput: React.FC<addT>= ({addTodo})=> {
    const [val,setVal] = useState('');
    console.log(val);
    const submitForm = (e:any) => {
        console.log("submitForm called")
        e.preventDefault();
        if (!val) return;
        addTodo(val);
        console.log(val);
        setVal('');
        
    }
    return(
        <form>
            <input type="text" placeholder="add toDo..." className="input" value={val} onChange={e => setVal(e.target.value)} />
            <button onClick={submitForm}>Add</button>
        </form>
    )   
}    


//returns the tasks which are not completed
function getIncompleteItems(value:any) {
    return value.isCompleted == false && value.text !="";
  }
 
//used to get all the todos  
function getItems(value:any) {
    return value.text !="";
  }

  
//renders all the todos
export const Todo: React.FC =()=>{
let savedItems:any = localStorage.getItem('todos');
savedItems = JSON.parse(savedItems);
let dummy:any =[{text:'',isCompleted:false}]
const [todos, setTodos] = useState<any>(savedItems||dummy)
console.log(todos);

const addTodo= (text:string)=> {
    
    let newTodos = [...todos,{ text:text,isCompleted:false }]
    if (newTodos[0].text ==''){
        newTodos.splice(0,1);
        
    }
    setTodos(newTodos);
    
}


const completeTodo = (index:number) =>{
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
}

const removeTodo = (index:number)=>{
    const newTodos = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos);
}
const totalItems = todos.filter(getItems)
React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [JSON.stringify(todos)]);

return(
    <div className='todo-list'>
        Total Todos Remaining : {todos.filter(getIncompleteItems).length} out of {totalItems.length}
        {todos.map((todo:any,index:number)=>(
            <DisplayInfo  index={index} todoText={todo} completeTodo={completeTodo} removeTodo={removeTodo}/>
            
        ))}
        
        <TodoInput addTodo={addTodo}/>
    </div>
        
)

}