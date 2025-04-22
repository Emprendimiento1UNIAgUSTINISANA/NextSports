window.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return window.location.href = '/dev/views/logpage.html';
    }
  
    document.querySelector('.profile-name').textContent = user.name;
    document.querySelector('.profile-email').textContent = user.email;
  });
  
  