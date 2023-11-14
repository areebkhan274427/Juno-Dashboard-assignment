import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [triggerReason, setTriggerReason] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };

  // Inside MyTableComponent.js
  useEffect(() => {
    // Fetch data from JSON file
    fetch("/data.json") // Accessing from the public folder
      .then((response) => response.json())
      .then((data) => {
        setData(data.pending);
        setFilterData(data.pending);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.user.toLowerCase().includes(search.toLowerCase().trim()) ||
        item.riskLevel.toLowerCase().includes(search.toLowerCase().trim()) ||
        item.triggerReason
          .toLowerCase()
          .includes(search.toLowerCase().trim()) ||
        item.inQueueFor.includes(search.trim()) ||
        item.dateAddedOn.includes(search.trim()) ||
        item.previouslyReviewed
          .toLowerCase()
          .includes(search.toLowerCase().trim()) ||
        item.userEmail.toLowerCase().includes(search.toLowerCase().trim())
    );
    setFilterData(filtered);
  }, [search]);

  useEffect(() => {
    console.log(triggerReason);
    const filtered = data.filter((item) =>
      item.triggerReason.includes(triggerReason)
    );
    setFilterData(filtered);
  }, [triggerReason]);

  useEffect(() => {
    console.log(triggerReason);
    const filtered = data.filter((item) => item.riskLevel.includes(riskLevel));
    setFilterData(filtered);
  }, [riskLevel]);

  return (
    <div className="container mt-3">
      <h2>Monitoring</h2>
      <div className="top-buttons">
        <div className="top-left-buttons">
          <button
            className={
              location.pathname === "/monitoring/pending" ? "active" : ""
            }
            onClick={() => navigate("/monitoring/pending")}
          >
            Pending
          </button>
          <button
            className={
              location.pathname === "/monitoring/completed" ? "active" : ""
            }
            onClick={() => navigate("/monitoring/completed")}
          >
            Completed
          </button>
        </div>

        <div className="top-right-buttons">
          <button onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle mb-1 mx-1"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Close account
          </button>
        </div>
      </div>
      <hr />

      <div className="search-container" style={{ marginTop: "35px" }}>
        <input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          onChange={(e) => setTriggerReason(e.target.value)}
          className="form-select"
        >
          <option value={""}>Trigger Reason</option>
          <option value={"Hard Flag"}>Hard Flag</option>
          <option value={"Temp Flag"}>Temp Flag</option>
          <option value={"Restricted Flag"}>Restricted Flag</option>
          <option value={"Un Flag"}>Un Flag</option>
          <option value={"Reviewed"}>Reviewed</option>
          <option value={""}>All</option>
        </select>
        <select
          onChange={(e) => setRiskLevel(e.target.value)}
          className="form-select"
        >
          <option value={""}>Risk Level</option>
          <option value={"Low"}>Low</option>
          <option value={"Medium"}>Medium</option>
          <option value={"High"}>High</option>
          <option value={""}>All</option>
        </select>
      </div>

      <div className="my-4 table-responsive">
        <table className="tabl">
          <thead className="thead">
            <tr>
              <td>User</td>
              <td>Risk Level</td>
              <td>Trigger Reason</td>
              <td>In queue for</td>
              <td>Date added on</td>
              <td>Previously reviewed</td>
            </tr>
          </thead>
          <tbody>
            {filterData?.map((ele, index) => (
              <tr key={index}>
                <td>
                  <strong>{ele.user}</strong> <br />{" "}
                  <strong className="email">{ele.userEmail}</strong>
                </td>
                <td>
                  <strong
                    className={
                      ele.riskLevel === "Low"
                        ? "risk-green"
                        : ele.riskLevel === "Medium"
                        ? "risk-orange"
                        : ele.riskLevel === "High"
                        ? "risk-red"
                        : ""
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-circle-fill mx-1"
                      viewBox="0 0 16 16"
                    >
                      <circle cx="6" cy="6" r="6" />
                    </svg>
                    {ele.riskLevel}
                  </strong>
                </td>
                <td>{ele.triggerReason}</td>
                <td>
                  <strong>{ele.inQueueFor}</strong>
                </td>
                <td>{ele.dateAddedOn}</td>
                <td>
                  <strong>{ele.previouslyReviewed}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-container" onClick={closeModal}>
          <div className="pop-up" onClick={(e) => e.stopPropagation()}>
            <div className="">
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
              <h4>Close account</h4>
              <div className="my-4">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="mb-4">
                <label className="form-label">Want to file UAR</label>
                <input
                  id="yes-uar"
                  style={{ marginLeft: "25px" }}
                  type="radio"
                  name="uar"
                />{" "}
                <label for="yes-uar">Yes</label>
                <input
                  id="no-uar"
                  style={{ marginLeft: "15px" }}
                  type="radio"
                  name="uar"
                />{" "}
                <label for="no-uar">No</label>
              </div>
              <div className="mb-4">
                <label className="form-label">Reason</label>
                <select className="form-select">
                  <option>Reason</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Note</label>
                <textarea className="form-control"></textarea>
              </div>
              <div className="pop-up-button">
                <div>
                  <input id="fee" style={{ marginRight: "5px" }} type="radio" />
                  <label for="fee">Charge closure fee</label>
                </div>
                <button onClick={closeModal} className="close-acc">
                  Close account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;
