function valid (form) {
    var email = form.email.value;
    var password = form.password.value;
    var anypassword = form.anypassword.value;
    var usersEmail = ["123@gmail.com", "var@gmail.com", "for@gmail.com"];
    if (password !== anypassword)
        alert('enter password again');
    (emailGet.indexOf(email) >= 0)? alert('this user already exists'):console.log(email, password, anypassword);
}
