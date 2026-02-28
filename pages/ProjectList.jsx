import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectList.css";

export function ProjectList() {
  const inputBox = useRef(null);
  const listContainer = useRef(null);
  const addTaskForm = useRef(null);
  const filter = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      navigate("/confirm-login");
      return;
    }

    const inputBoxEl = inputBox.current;
    const listContainerEl = listContainer.current;
    const addTaskFormEl = addTaskForm.current;
    const filterEl = filter.current;

    if (!inputBoxEl || !listContainerEl || !addTaskFormEl || !filterEl) return;

    function filterItem(e) {
      let text = e.target.value.toLowerCase();
      let items = listContainerEl.getElementsByTagName("li");

      Array.from(items).forEach(function (item) {
        let itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }

    function saveData() {
      localStorage.setItem("data", listContainerEl.innerHTML);
    }

    function showTask() {
      listContainerEl.innerHTML = localStorage.getItem("data") || "";
    }

    function handleSubmit(e) {
      e.preventDefault();

      if (inputBoxEl.value === "") {
        alert("You must write something");
      } else {
        let li = document.createElement("li");
        li.innerHTML = inputBoxEl.value;
        listContainerEl.appendChild(li);

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "list-btn delete";
        deleteBtn.appendChild(document.createTextNode("X"));
        li.appendChild(deleteBtn);

        let span = document.createElement("span");
        span.innerHTML = "\u270E";
        li.appendChild(span);
      }

      inputBoxEl.value = "";
      saveData();
    }

    function handleListClick(e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
      } else if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure")) {
          let li = e.target.parentElement;
          listContainerEl.removeChild(li);
          saveData();
        }
      } else if (e.target.tagName === "SPAN") {
        let currentText = e.target.parentElement.firstChild.textContent;
        inputBoxEl.value = currentText;
        e.target.parentElement.remove();
        saveData();
      }
    }

    filterEl.addEventListener("keyup", filterItem);
    addTaskFormEl.addEventListener("submit", handleSubmit);
    listContainerEl.addEventListener("click", handleListClick, false);

    showTask();

    return () => {
      filterEl.removeEventListener("keyup", filterItem);
      addTaskFormEl.removeEventListener("submit", handleSubmit);
      listContainerEl.removeEventListener("click", handleListClick, false);
    };
  }, [navigate]);

  return (
    <div className="body">
      <div className="container">
        <div className="todo-app">
          <h1>
            To-Do List{" "}
            <img
              className="to-do-img"
              src="src/assets//undraw_to-do-list_eoia.svg"
              alt="to-do images"
            />
          </h1>

          <form className="add" id="add-task" ref={addTaskForm}>
            <input
              className="add-input"
              type="text"
              id="input-box"
              placeholder="Add your task..."
              ref={inputBox}
            />
            <button className="add-button" type="submit">
              Add
            </button>
          </form>

          <div className="search-div">
            <input
              className="search-input"
              type="text"
              id="search"
              placeholder="search your tasks"
              ref={filter}
            />
          </div>

          <ul className="li-list" id="list-container" ref={listContainer}></ul>
        </div>
      </div>
    </div>
  );
}
