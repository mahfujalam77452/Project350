import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SendMail = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showAllUsers, setShowAllUsers] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clubs data
    // axios.get('/v1/clubs')
    //   .then(response => {
    //     setClubs(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching clubs:', error);
    //   });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const recipients = showAllUsers ? 'all' : selectedClub;
      
      await axios.post('/v1/mail/send', {
        recipients,
        subject,
        message
      });

      alert('Email sent successfully!');
      navigate('/mailbox');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Send Email</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Send to:
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="allUsers"
                name="recipientType"
                checked={showAllUsers}
                onChange={() => setShowAllUsers(true)}
                className="mr-2"
              />
              <label htmlFor="allUsers">All Users</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="specificClub"
                name="recipientType"
                checked={!showAllUsers}
                onChange={() => setShowAllUsers(false)}
                className="mr-2"
              />
              <label htmlFor="specificClub">Specific Club Members</label>
            </div>
          </div>
          
          {!showAllUsers && (
            <div className="mt-2">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a club</option>
                {clubs.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default SendMail;
