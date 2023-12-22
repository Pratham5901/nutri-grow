let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
}

// window.onscroll = () =>{
//     searchForm.classList.remove('active');
//     cart.classList.remove('active');
//     loginForm.classList.remove('active');
//     navbar.classList.remove('active');
// }

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

function postToRegister() {
    // Create a form dynamically
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/register-page';

    // Append the form to the body
    document.body.appendChild(form);
    
    // Submit the form
    form.submit();
    
  }
  function validateForm() {
    
    const password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
console.log(password);
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match!');
      return false;
    }

    // Continue with form submission if passwords match
    return true;
  }
 


  
