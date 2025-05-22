import React, { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate } from 'react-router-dom';

// Base URL for the API (adjust if necessary)
const API_BASE_URL = 'http://localhost:3000/v1'; // From your .env file

const AddEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [clubId, setClubId] = useState(''); // For now, manual input
    const [imageFile, setImageFile] = useState(null); // State for the image file

    // State for club selection
    const [clubs, setClubs] = useState([]);
    const [clubsLoading, setClubsLoading] = useState(true);
    const [clubsError, setClubsError] = useState(null);

    // Component/loading state URL/path
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch clubs on mount
    useEffect(() => {
        const fetchClubs = async () => {
            setClubsLoading(true);
            setClubsError(null);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setClubsError('Authentication token not found.');
                setClubsLoading(false);
                return;
            }

            try {
                // Assuming endpoint /v1/clubs exists and returns [{ id: '...', name: '...' }]
                const response = await fetch(`${API_BASE_URL}/clubs`, { 
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setClubs(data.results || data || []); // Adjust based on actual API response structure
            } catch (err) {
                console.error("Failed to fetch clubs:", err);
                setClubsError(err.message || 'Failed to load clubs.');
            } finally {
                setClubsLoading(false);
            }
        };

        fetchClubs();
    }, []); // Empty dependency array means run once on mount
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]); // Store the file object
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        // --- Get Auth Token (Assuming localStorage) ---
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('Authentication token not found. Please log in.');
            setSubmitting(false);
            return;
        }
        // -------------------------------------------

        // Basic validation
        if (!title || !description || !date || !clubId) {
            setError('Title, Description, Date, and Club ID are required.');
            setSubmitting(false);
            return;
        }

        let cloudinaryUrl = '';
        
        // If image is selected, upload to Cloudinary first
        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('folder', 'events');
                
                const uploadResponse = await fetch(`${API_BASE_URL}/uploads/upload-single`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });

                const uploadData = await uploadResponse.json();
                if (!uploadResponse.ok) {
                    throw new Error(uploadData.error || 'Failed to upload image to Cloudinary');
                }
                
                cloudinaryUrl = uploadData.url;
            } catch (err) {
                console.error('Failed to upload image:', err);
                setError('Failed to upload image. Please try again.');
                setSubmitting(false);
                return;
            }
        }

        // Create event data
        const eventData = {
            title,
            description,
            date,
            time,
            location,
            clubId,
            image: cloudinaryUrl
        };

        try {
            const response = await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
            }

            setSuccess('Event created successfully!');
            // Clear form
            setTitle('');
            setDescription('');
            setDate('');
            setTime('');
            setLocation('');
            setClubId('');
            setImageFile(null);
            // Navigate back to events list
            setTimeout(() => navigate('/event'), 1500);

        } catch (err) {
            console.error("Failed to create event:", err);
            setError(err.message || 'Failed to create event. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    // Removed console logs

    return (
        <div className="panel">
            <h1 className="text-lg font-semibold mb-5">Add New Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                        <input 
                            type="text" 
                            id="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="form-input mt-1 block w-full" 
                            required 
                        />
                    </div>
                    {/* Club ID Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="clubId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Club *</label>
                        <select 
                            id="clubId" 
                            value={clubId} 
                            onChange={(e) => setClubId(e.target.value)} 
                            className="form-select mt-1 block w-full" 
                            required 
                            disabled={clubsLoading || !!clubsError}
                        >
                            <option value="" disabled>-- Select a Club --</option>
                            {clubsLoading && <option value="" disabled>Loading clubs...</option>}
                            {clubsError && <option value="" disabled>Error loading clubs</option>}
                            {!clubsLoading && !clubsError && clubs.map(club => (
                                <option key={club.id} value={club.id}>
                                    {club.name} (ID: {club.id})
                                </option>
                            ))}
                        </select>
                        {clubsError && <p className="text-red-500 text-xs mt-1">{clubsError}</p>}
                    </div>
                    {/* End Club ID Dropdown */}
                    <div className="mb-4 md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
                        <textarea 
                            id="description" 
                            rows="3" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="form-textarea mt-1 block w-full" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date *</label>
                        <input 
                            type="date" 
                            id="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            className="form-input mt-1 block w-full" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                        <input 
                            type="text" 
                            id="time" 
                            value={time} 
                            onChange={(e) => setTime(e.target.value)} 
                            className="form-input mt-1 block w-full" 
                            placeholder="e.g., 10:00 AM - 12:00 PM" 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                        <input 
                            type="text" 
                            id="location" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            className="form-input mt-1 block w-full" 
                        />
                    </div>
                    {/* Image Upload Input */}
                    <div className="mb-4 md:col-span-2">
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Image</label>
                        <input 
                            type="file" 
                            id="imageFile" 
                            onChange={handleFileChange} 
                            className="form-input mt-1 block w-full" 
                            accept="image/*" // Accept only image files
                        />
                        {/* Optional: Preview image */}
                        {imageFile && (
                            <div className="mt-2">
                                <img src={URL.createObjectURL(imageFile)} alt="Preview" className="h-20 w-auto rounded"/>
                            </div>
                        )}
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mb-4">Error: {error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                <div className="flex justify-end">
                    <button 
                        type="button" 
                        onClick={() => navigate('/event')} 
                        className="btn btn-outline-secondary mr-2"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEvent;
