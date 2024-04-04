import { useForm } from "react-hook-form";
import "./User.css";
import React, { useState, useEffect, useRef } from "react";
import { UnpaperClientList } from "./UnpaperClientList.js";

const UserApp = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isForm, setIsForm] = useState(false);
  //declare data here
  const [data, setData] = useState(UnpaperClientList);

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
      reset(editData);
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
    reset({
      CRN: newCRNIds,
      clientName: "",
      emailAddress: "",
      phoneNumber: "",
      taskId: "",
      taskStatus: "",
      taskTitle: "",
    });

    setIsForm(true);
  };
  const onSubmit = (formData) => {
    const newData = [...data];
    const existingDataIndex = newData.findIndex(
      (item) => item.CRN === formData.CRN
    );
    if (existingDataIndex !== -1) {
      newData[existingDataIndex] = formData;
    } else {
      newData.push(formData);
    }
    // <h1> heeeyyyyyyyyy</h1>
    setData(newData);
    setIsForm(false);
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
        <form className="lable-input-btn" onSubmit={handleSubmit(onSubmit)}>
          <label>
            CRN: <input {...register("CRN")} disabled={true} />
          </label>
          <br />
          <label>
            ClientName:
            <input {...register("clientName")} placeholder="ClientName" />
          </label>
          <br />
          <label>
            EmailAddress:
            <input {...register("emailAddress")} placeholder="EmailAddress" />
          </label>
          <br />
          <label>
            PhoneNumber:
            <input {...register("phoneNumber")} placeholder="Phonenumber" />
          </label>
          <br />
          <label>
            TaskID: <input {...register("taskId")} placeholder="TaskId" />
          </label>
          <br />
          <label>
            TaskStatus:
            <input {...register("taskStatus")} placeholder="TaskStatus" />
          </label>
          <br />
          <label>
            TaskTitle:
            <input {...register("taskTitle")} placeholder="TaskTitle" />
          </label>
          <br />
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
          &nbsp;
          {/* <button className="submit-btn" onClick={handleSubmit.bind(this)}> */}
          <button className="submit-btn" type="submit">
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
