import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; // Import your custom styles for the Profile page

const Profile = () => {
  const [user, setUser] = useState(null);
// In the future: Integrate Firebase Auth and Storage together for secure user data storage.
// To enjoy bookmarked recipes across devices with streamlined authentication and cloud-based storage.

  useEffect(() => {
    // Simulated data for the sample profile
    const sampleUser = {
      firstName: 'Steven',
      lastName: 'Doe',
      email: 'steven.doe@example.com',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg', // Random user image
      bio: 'Passionate foodie exploring the world of culinary delights. Always up for trying new recipes!',
      bookmarks: [
        { id: 'Roasted%20Vegetable%20and%20Quinoa%20Salad', recipeName: 'Roasted Vegetable and Quinoa Salad' },
        { id: 'Roasted%20Garlic%20Mashed%20Potatoes', recipeName: 'Roasted Garlic Mashed Potatoes' },
        // Add more sample bookmarks as needed
      ],
    };

    setUser(sampleUser);
  }, []);

  return (
    <div className="profile-container">
      {user && (
        <div>
          <div className="profile-header">
            <img className="profile-image" src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
            <div className="profile-info">
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              <p>{user.email}</p>
              <p>{user.bio}</p>
            </div>
          </div>
          <div className="profile-content">
            <h3>Bookmarked Recipes</h3>
            {user.bookmarks.length > 0 ? (
              <ul className="bookmarks-list">
                {user.bookmarks.map((bookmark) => (
                  <li key={bookmark.id}>
                    <Link to={`/recipe/${bookmark.id}`}>{bookmark.recipeName}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookmarked recipes yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
