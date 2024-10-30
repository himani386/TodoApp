import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
  },
};

function Dialogue({ modalIsOpen, setIsOpen, editTitle, desc, id ,fetchdata}) {
  const [description, onDescription] = useState(desc);
  const [title, onTitle] = useState(editTitle);
  const handleChange = (event) => {
    const newVal = event.target.value;
    onTitle(newVal);
  };
  
  const handleChange1 = (event) => {
    const newVal = event.target.value;
    onDescription(newVal);
  };
  const handleClick = async () => {
    const obj = {
      title: title,
      description: description,
    };
    if (title == "") {
      alert("please select a title");
      return;
    }
    if (description == "") {
      alert("please select description");
      return;
    }
    await axios.patch(`https://api.freeapi.app/api/v1/todos/${id}`,obj)
    onDescription("");
    onTitle("");
    closeModal() 
    fetchdata()
   
  };

 

  function closeModal() {
    setIsOpen(false);
    
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
       
        <div className="w-11/12 max-w-2xl   flex   flex-col gap-4 mx-auto  p-5 rounded-lg shadow-lg">
          <input
            placeholder="Enter title of the todo"
            value={title}
            className="  bg-neutral-300 rounded-lg  outline-none px-5 py-2"
            onChange={handleChange}
          ></input>
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="30"
            placeholder="Enter your Description"
            value={description}
            onChange={handleChange1}
            className="px-5  outline-none  bg-neutral-300 py-2 rounded-lg"
          ></textarea>
          <button
            className="  bg-rose-500 rounded-lg py-2"
            onClick={handleClick}
          >
            Edit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Dialogue;
