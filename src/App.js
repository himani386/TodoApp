import logo from './logo.svg';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useState,useEffect } from "react";
import './App.css';
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Todo from './dialogue';
import Dialogue from './dialogue';

function App() {
  const[title,setTitle]=useState("");
  const[desc,setDesc]=useState("");
  const[todo,setTodo]=useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const[Title,editTitle] = useState("");
  const[Desc,editDesc] = useState("");
   const[editId,setId] = useState("");

  const handleTitle=(event) =>{
    const newVal=event.target.value;
     setTitle(newVal);
  }
  const handleDesc=(event) =>{
    const newVal=event.target.value;
    setDesc(newVal);
  }

 const addTodo = async() =>{
  const temp={
    title:title,
    description:desc
  }
 // var tempr=[...todo,temp];
 //setTodo(tempr);
 if (title== "" ){
  alert("please select a title")
  return
}
if(desc == ""){
  alert("please select description")
  return
}

 await axios.post("https://api.freeapi.app/api/v1/todos",temp)
  toast.success("Todo add successfully");
   setDesc("");
  setTitle("");
  fetchData( );

 }
 
 
 const fetchData = async() =>{
   const response= await axios.get("https://api.freeapi.app/api/v1/todos")
  setTodo(response.data.data);
 }
useEffect(()=>{
  fetchData();
},[])
const oncheckHandler = async(todoId) =>{
  console.log(todoId)
  await axios.patch(`https://api.freeapi.app/api/v1/todos/toggle/status/${todoId}`)
  
  fetchData();
}

  const ondeleteHandler =async(todoId) =>{
    try{
   await axios.delete(`https://api.freeapi.app/api/v1/todos/${todoId}`)

    fetchData();
    }
    catch(error){
      console.log(error)
    }
    
  }
 
   const onupdateHandler = async(Id,title,description) =>{
        editTitle(title);
        editDesc(description)
        setId(Id)
        setIsOpen(true);
 
   }


  return (
    <div className="w-[100%] min-h-screen p-4 relative flex items-center bg-[#212121] shadow-[#202128]">
      <div className="bg-[#424242]  w-11/12 max-w-2xl mx-auto p-5 flex  flex-col rounded-2xl ">
      <div className="flex items-center justify-center">
      <h1 className="text-[30px] font-bold font-poppins text-white">Todo List</h1>
      </div>
      {/* <div className="bg-[#2F4F4F] w-11/12 max-w-2xl mx-auto p-5 flex flex-col rounded-lg  shadow-[0_4px_6px_3px_rgba(0,0,0,0.5)] g-4" > */}
      <input className=" p-2 outline-none bg-[#212121] rounded-lg outline-1 outline-[#582F7f]" type="text" placeholder="Enter your title" value={title} onChange={handleTitle} ></input>
      <textarea id="w3review" name="w3review" rows="3" placeholder="Enter your Description"  cols="25" value={desc} onChange={handleDesc}className="p-3 mt-3 rounded-md outline-1 bg-[#212121]  outline-[#582F7f]"></textarea>
      <button className="bg-[#582F7f] p-2 font-semibold rounded-md mt-2"  onClick={addTodo}>Add Your Todo</button>
    

      {/* </div> */}
       <div className="w-11/12 max-w-2xl mx-auto p-5 mt-2">
       {
        todo.map((todo) => (
          <div className={ `${todo.isComplete?"bg-green-500":"bg-[#1F1F1F]" } flex justify-between  shadow-[0_4px_6px_3px_rgba(0,0,0,0.5)] g-4  rounded-lg mt-4` }>
            <div className="flex flex-row p-5 gap-4 ">
              <div className=" flex items-center justify-center">
              <input type="checkbox" onClick={() =>oncheckHandler(todo._id)} checked={todo.isComplete} className= "w-5 h-5 bg-[#DB7706]" ></input>
            </div>
            
            <div className="flex flex-col ">
             <h1>{todo.title}</h1>
              <p className="text-gray-300 ">{todo.description}</p>
              </div>
             </div>
             <div className=" flex items-center justify-center">
             <div className="flex flex-row p-4 gap-1  ">
              <AiFillDelete className="h-[20px] w-[20px] text-red-700 mr-2 " onClick={() =>ondeleteHandler(todo._id)} />
              <FaRegEdit  className="h-5 w-6 ml-2 text-green-400" onClick={() =>onupdateHandler(todo._id,todo.title,todo.description)} />
             </div>
             </div>

          </div>
        ))}
       </div>
       {modalIsOpen && 
      <Dialogue modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} editTitle={Title} desc={Desc} id={editId} fetchdata={fetchData}></Dialogue>
      }
       <Toaster />
       </div>
    </div>
  );
}

export default App;
