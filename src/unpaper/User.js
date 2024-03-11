import "./User.css";
import React, { useState, useEffect, useRef } from "react";
import { UnpaperClientList } from "./UnpaperClientList.js";

const UserApp = () => {
  const [isForm, setIsForm] = useState(false);
  //declarre data here
  const [data, setData] = useState(UnpaperClientList);
  //  const [editRecId,setEditRecId]=useState('')

  const [fields, setFields] = useState({
    CRN: "",
    clientName: "",
    emailAddress: "",
    phoneNumber: "",
    taskId: "",
    taskStatus: "",
    taskTitle: "",
  });

  const nextCRNIdRef = useRef(1);

  useEffect(() => {
    if (data.length > 0) {
      const maxId = Math.max(...data.map((item) => item.CRN));
      nextCRNIdRef.current = maxId + 1;
    }
  }, [data]);

  const generateCRNId = () => {
    const newCRNId = nextCRNIdRef.current;
    nextCRNIdRef.current++;
    return newCRNId;
  };

  const handleEdit = (CRN) => {
    const editData = data.find((item) => item.CRN === CRN);
    if (editData) {
      setFields(editData);
      setIsForm(true);
    }
  };

  const handleDelete = (CRNToDelete) => {
    const updateData = data.filter((item) => item.CRN !== CRNToDelete);

    if (window.confirm("Are you sure you want to delete!")) {
      setData(updateData);
    }
  };

  const handleAdd = () => {
    const newCRNIds = generateCRNId();
    setFields({
      CRN: newCRNIds,
      clientName: "",
      emailAddress: "",
      phoneNumber: "",
      taskId: "",
      taskStatus: "",
      taskTitle: "",
    });

    setIsForm(true);
    // setIsEdit(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = [...data];
    const existingdata = newData.findIndex((item) => item.CRN === fields.CRN);
    if (existingdata !== -1) {
      newData[existingdata] = fields;
    } else {
      newData.push(fields);
    }
    setData(newData);
    setIsForm(false);
  };
  const handleChange = (fieldName, e) => {
    const updatedFields = { ...fields };

    // if (fieldName === "CRN") {
    updatedFields[fieldName] = e.target.value;
    // } else {
    // updatedFields[fieldName] = e.target.value;
    // }
    setFields(updatedFields);
  };
  const handleBack = () => {
    setIsForm(false);
  };

  return (
    <div className="main-div">
      <h1>User Data</h1>
      {/* using terenory operator saying ui what to
         display by giving isForm (false) in usestate */}
      {isForm ? (
        <form className="lable-input-btn" onSubmit={handleSubmit}>
          <label htmlFor="CRN">CRN: </label>
          <input
            type="text"
            id="CRN"
            name="CRN"
            value={fields.CRN}
            disabled // Disable editing of the ID field
          />
          <br />
          <label htmlFor="clientName">ClientName: </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            placeholder="ClientName"
            onChange={handleChange.bind(this, "clientName")}
            value={fields.clientName}
          />
          <br />
          <label htmlFor="emailAddress">EmailAddress: </label>
          <input
            type="Email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Email@"
            onChange={handleChange.bind(this, "emailAddress")}
            value={fields.emailAddress}
          />
          <br />
          <label htmlFor="pNumber">PhoneNumber: </label>
          <input
            type="phoneNumber"
            id="pNumber"
            name="pNumber"
            placeholder="phoneNumber"
            onChange={handleChange.bind(this, "phoneNumber")}
            value={fields.phoneNumber}
          />
          <br />
          <label htmlFor="taskId">TaskID: </label>
          <input
            type="text"
            id="taskId"
            name="taskId"
            placeholder="taskId"
            onChange={handleChange.bind(this, "taskId")}
            value={fields.taskId}
          />
          <br />
          <label htmlFor="taskStatus">TaskStatus: </label>
          <input
            type="text"
            id="taskStatus"
            name="taskStatus"
            placeholder="taskStatus"
            onChange={handleChange.bind(this, "taskStatus")}
            value={fields.taskStatus}
          />
          <br />
          <label htmlFor="taskTitle">TaskTitle: </label>
          <input
            type="text"
            id="taskTitle"
            name="taskTitle"
            placeholder="taskTitle"
            onChange={handleChange.bind(this, "taskTitle")}
            value={fields.taskTitle}
          />
          <br />
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
          &nbsp;
          <button className="submit-btn" onClick={handleSubmit.bind(this)}>
            Submit
          </button>
        </form>
      ) : (
        <div>
          <button className="add-btn" onClick={handleAdd}>
            ADD
          </button>
          <table className="table-design">
            <thead>
              <tr>
                <th>CRN</th>
                <th>ClientName</th>
                <th>EmailAddress</th>
                <th>PhoneNumber</th>
                <th>TaskId</th>
                <th>TaskStatus</th>
                <th>TaskTitle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.CRN}</td>
                    <td>{item.clientName}</td>
                    <td>{item.emailAddress}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.taskId}</td>
                    <td>{item.taskStatus}</td>
                    <td>{item.taskTitle}</td>
                    <td>
                      <button
                        className="Edit-btn"
                        onClick={() => handleEdit(item.CRN)}
                      >
                        Edit
                      </button>
                      &nbsp;
                      <button
                        className="Delt-btn"
                        onClick={() => handleDelete(item.CRN)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserApp;
