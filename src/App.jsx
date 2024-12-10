import React, { useState, useEffect } from "react";
import Dummy from "./assets/Dummyimage.jpg";
import "./App.css";

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Emails");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [tone, setTone] = useState("Neutral");
  const [isComposing, setIsComposing] = useState(false);

  // Mock email data
  useEffect(() => {
    const mockEmails = [
      {
        id: 1,
        sender: "example@example.com",
        subject: "Project Update",
        date: "2024-12-09",
        priority: 1,
        sentiment: "Positive",
        category: "Technical",
        filterType: "Unread Emails",
        attachments: ["Attachment1.pdf", "Attachment2.docx"],
      },
      {
        id: 2,
        sender: "hr@example.com",
        subject: "Meeting Invite",
        date: "2024-12-08",
        priority: 3,
        sentiment: "Neutral",
        category: "HR",
        filterType: "Follow-ups",
        attachments: ["MeetingAgenda.docx"],
      },
    ];
    setEmails(mockEmails);
  }, []);

  // Filter and search logic
  const filteredEmails = emails.filter(
    (email) =>
      (selectedCategory === "All Emails" ||
        email.category === selectedCategory) &&
      (selectedFilter === "" || email.filterType === selectedFilter) &&
      (email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sorting logic
  const sortedEmails = [...filteredEmails].sort((a, b) => {
    if (sortCriteria === "Date") return new Date(b.date) - new Date(a.date);
    if (sortCriteria === "Priority") return b.priority - a.priority;
    if (sortCriteria === "Sentiment")
      return a.sentiment.localeCompare(b.sentiment);
    return 0;
  });

  // Handlers
  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handleFilterClick = (filter) => setSelectedFilter(filter);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortCriteria(e.target.value);
  const handleEmailClick = (email) => setSelectedEmail(email);
  const handleComposeClick = () => setIsComposing(true);
  const handleSendResponse = () => {
    console.log("Response Sent:", { responseText, tone });
    setResponseText("");
    setTone("Neutral");
  };

  return (
    <div className="app_container">
      {/* Left Panel */}
      <div className="left_container">
        <div className="categories_main_container">
          <h2 className="categories_title">Categories</h2>
          <ul className="categories_list_items">
            {[
              "All Emails",
              "Categorized Emails",
              "Finance",
              "HR",
              "Technical",
            ].map((category) => (
              <li key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="filters_main_container">
          <h2 className="filters_title">Filters</h2>
          <ul className="filters_items">
            {["Unread Emails", "Flagged Messages", "Follow-ups"].map(
              (filter) => (
                <li key={filter} onClick={() => handleFilterClick(filter)}>
                  {filter}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right_main_container">
        <div className="header">
          <div className="pic_and_name">
            <div className="pic">
              <img src={Dummy} alt="User" />
            </div>
            <div className="name_position">
              <h2 className="name">John Doe</h2>
              <h3 className="position">Manager</h3>
            </div>
          </div>
          <div className="searchbar_icon">
            <input
              className="searchbar"
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="compose_switchaccount_notifications">
            <button className="compose" onClick={handleComposeClick}>
              Compose
            </button>
            <button className="switch_account">Switch Account</button>
            <button className="Notifications">Notifications</button>
          </div>
        </div>

        {/* Email List */}
        <div className="Email_list_main_container">
          <h2 className="email_list_title">Email List</h2>
          <div className="sort_by_container">
            <label htmlFor="select">Sort By</label>
            <select
              id="select"
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option value="">None</option>
              <option value="Date">Date</option>
              <option value="Priority">Priority</option>
              <option value="Sentiment">Sentiment</option>
            </select>
          </div>
          <div className="filter_result_table">
            <table>
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {sortedEmails.map((email) => (
                  <tr key={email.id} onClick={() => handleEmailClick(email)}>
                    <td>{email.sender}</td>
                    <td>{email.subject}</td>
                    <td>{email.date}</td>
                    <td>{email.priority}</td>
                    <td>{email.sentiment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Email Detail */}
        {selectedEmail && (
          <div className="email_detail_main_container">
            <h2 className="email_detail_title">Email Detail</h2>
            <div className="from_container">
              <h4 className="from">From:</h4>
              <p>{selectedEmail.sender}</p>
            </div>
            <div className="subject_container">
              <h4 className="subject">Subject:</h4>
              <p>{selectedEmail.subject}</p>
            </div>
            <h3 className="summary">Summary</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum.
            </p>
            <div className="attachments">
              <h3 className="attachments_title">Attachments</h3>
              <ul className="attachments_lists">
                {selectedEmail.attachments.map((attachment, index) => (
                  <li key={index}>
                    <a href="#">{attachment}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="response_suggestions">
              <div className="response_and_text">
                <h2>Response Suggestions:</h2>
                <textarea
                  placeholder="Type your response here..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
              </div>
              <div className="tone_and_send_button">
                <div className="tone_choice">

                <label htmlFor="tone">Tone:</label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Formal">Formal</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Casual">Casual</option>
                </select>
                </div>
                <button
                  className="send_response_btn"
                  onClick={handleSendResponse}
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
