function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    return element;
  }
  
  
  function createSignUpForm() {
    const usernameInput = createElement('input', { type: 'text', placeholder: 'Username' });
    const emailInput = createElement('input', { type: 'email', placeholder: 'Email' });
    const passwordInput = createElement('input', { type: 'password', placeholder: 'Password' });
    const registerButton = createElement('button', {}, ['Register']);
  
    registerButton.addEventListener('click', () => {
      const username = usernameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
  
      if (username && email && password) {
        console.log('Registration successful!');
        console.log(`Username: {username}`);
        console.log(`Email: {email}`);
      } else {
        console.log('Please fill in all fields.');
      }
    });
  
    return createElement('div', {}, [
      createElement('h2', {}, ['Sign Up']),
      createElement('div', { class: 'form-group' }, [usernameInput]),
      createElement('div', { class: 'form-group' }, [emailInput]),
      createElement('div', { class: 'form-group' }, [passwordInput]),
      createElement('div', { class: 'form-group' }, [registerButton]),
    ]);
  }
  
  function displaySignUpPage() {
    const container = createElement('div', { class: 'container' }, [createSignUpForm()]);
    document.body.appendChild(container);
  }
  
  displaySignUpPage();
  