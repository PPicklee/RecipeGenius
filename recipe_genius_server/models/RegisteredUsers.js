class RegisteredUser {
    constructor(firstName, lastName, dateOfBirth, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.email = email;
      this.password = password;
      this.dietaryRestrictions = [];
      this.bookmarks = [];
    }
  
    login() {
      // Implementation for user login
      console.log(`${this.email} logged in successfully.`);
    }
  
    logout() {
      // Implementation for user logout
      console.log(`${this.email} logged out.`);
    }
  
    register() {
      // Implementation for user registration
      console.log(`${this.email} registered successfully.`);
    }
  
    addBookmark(bookmark) {
      // Implementation for adding a bookmark
      this.bookmarks.push(bookmark);
      console.log(`${this.email} added a bookmark: ${bookmark}`);
    }
  
    removeBookmark(bookmark) {
      // Implementation for removing a bookmark
      const index = this.bookmarks.indexOf(bookmark);
      if (index !== -1) {
        this.bookmarks.splice(index, 1);
        console.log(`${this.email} removed bookmark: ${bookmark}`);
      } else {
        console.log(`${this.email} does not have bookmark: ${bookmark}`);
      }
    }
  }
  
  // Example usage:
//   const user1 = new RegisteredUser("John", "Doe", new Date(1990, 0, 1), "john@example.com", "password123");
//   user1.register();
//   user1.login();
//   user1.addBookmark("Favorite Article 1");
//   user1.addBookmark("Favorite Article 2");
//   user1.removeBookmark("Favorite Article 1");
//   user1.logout();
  