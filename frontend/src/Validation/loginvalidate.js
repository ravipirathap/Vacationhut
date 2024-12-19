function Validation(email, password) {
  let error = {};
  const checkmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const checkpass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]\\|;:'",.<>/?]).{8,}$/;

  if (email === "") {
    error.email = "Enter Email";
  } else if (!checkmail.test(email)) {
    error.email = "Invalid Email";
  } else {
    error.email = "";
  }
  if (password === "") {
    error.password = "Enter Passwoerd";
  } else if (!checkpass.test(password)) {
    error.password = "Enter Valid Password";
    // alert("Password must have lover case , upper case ,one number ,one special character and minimum 8 characters")
  } else {
    error.password = "";
  }
  return error;
}

export default Validation;
