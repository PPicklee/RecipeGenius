// BookmarkList.js
import React from 'react';

const BookmarkList = ({ bookmarks }) => {
  return (
    <div>
      <h3>Bookmarked Recipes</h3>
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index}>{bookmark}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
