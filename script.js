const getUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');
      const users = response.data.data;
      displayUsers(users);
    } catch (error) {
      console.error(error);
    }
  }
  
  const displayUsers = (users) => {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
      const userElement = document.createElement('li');
      userElement.textContent = `${user.first_name} ${user.last_name}`;
      userElement.setAttribute('data-id', user.id);
  
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'delete-icon fas fa-trash-alt';
      deleteIcon.addEventListener('click', () => deleteUser(user.id));
  
      userElement.appendChild(deleteIcon);
      userList.appendChild(userElement);
    });
  }
  
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      console.log(`User ${userId} deleted`);
  
      const userElement = document.querySelector(`li[data-id="${userId}"]`);
      if (userElement) {
        userElement.remove();
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  getUsers();
  