(() => {
    const loginBtn = document.getElementById('login-btn');
    const profileBtn = document.getElementById('profile-btn');
    const greeting = document.getElementById('greeting');
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      if (greeting) greeting.textContent = `Hola, ${user.name}`;
      if (loginBtn) loginBtn.style.display = 'none';
      if (profileBtn) profileBtn.style.display = 'inline-block';
    }
  
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.location.href = '/dev/views/logpage.html';
      });
    }
  
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        window.location.href = '/dev/views/profile.html';
      });
    }
  })();
  
  