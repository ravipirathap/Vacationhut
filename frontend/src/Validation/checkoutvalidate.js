function Validation(name, email, passportno,nic,phonenumber,country) {
    let error = {};
    const checkmail =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+(?!.*\.))*$/i
    ;
    const checknic =
    /^[0-9]{9}[VX]$/i;
    const checknewnic = /^\d{12}$/i;
      const checkpass =
      /^[A-Z]{1,2}[0-9]{7,8}$/i;
      const checknumber =
      /^\+(?:[0-9] ?){6,14}[0-9]$/i;
    if (name === "") {
      error.name = "Enter name";
    } else {
      error.name = "";
    }
  
    if (email === "") {
      error.email = "Enter Email";
    } else if (!checkmail.test(email)) {
      error.email = "Invalid Email";
    } else {
      error.email = "";
    }
    if (country === "LK") {
      if (nic === "") {
        error.nic = "Enter NIC";
      } else if (!checknic.test(nic)) {
        error.nic = "Enter Valid NIC";
      } else {
        error.nic = "";
      }
  
      error.passportno = "";
    } else {
      if (passportno === "") {
        error.passportno = "Enter Passport No";
      } else if (!checkpass.test(passportno)) {
        error.passportno = "Enter Valid Passport No";
      } else {
        error.passportno = "";
      }
  
      error.nic = "";
    }
      if (phonenumber === "") {
        error.phonenumber = "Enter Phone Number";
      } else if (!checknumber.test(phonenumber)) {
        error.phonenumber = "Enter Valid Phone Number";
        // alert("Password must have lover case , upper case ,one number ,one special character and minimum 8 characters")
      } else {
        error.phonenumber = "";
      }
    return error;
  }
  
  export default Validation;
  