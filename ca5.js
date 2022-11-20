//getting the element from the html file
const stdIDE1 = document.querySelector("#stdID");
const stdNameE1 = document.querySelector("#stdName");
const form = document.querySelector("#container1");

form.addEventListener("submit", function (e) {
  let isStdIDValid = checkstdID(),
    isStdNameValid = checkStdtName();
  let isFormValid = isStdIDValid && isStdNameValid; //submit to server if the form is valid
  if (isFormValid) {
    confirm("Is the given information correct."); //to get final confirmation or to reset the data if the information is wrong.
    return true;
  } else {
    e.preventDefault(); //prevent the form from submitting
  }
});

//function to validate the student ID
const checkstdID = () => {
  let valid = false;
  const min = 11,
    max = 11;
  const stdID = stdIDE1.value.trim(); //trim is going to remove the space before and after the text and give text only
  //calling the showerror function with two arguments

  if (!isRequired(stdID)) {
    showError(stdIDE1, "StudentID cannot be blank.");
  } else if (!isBetween(stdID.length, min, max)) {
    showError(stdIDE1, `StudentID must be of ${max} characters.`);
  } else if (!isStdIDValid(stdID)) {
    showError(
      stdIDE1,
      "StudentID is not valid, it should be like 'SOC' followed by your enrollment number"
    );
  }
  //calling the showsuccess function with two arguments
  else {
    showSuccess(stdIDE1);
    valid = true;
  }
  return valid;
};

//Regular expression to validate the student ID pattern
const isStdIDValid = (stdID) => {
  const re = /^(SOC)([0-9]{8})$/;
  return re.test(stdID);
};

//function to validate the student name
const checkStdtName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const stdName = stdNameE1.value.trim(); //trim is going to remove the space before and after the text and give text only
  //calling the showerror function with two arguments
  if (!isRequired(stdName)) {
    showError(stdNameE1, "Student name cannot be blank.");
  } else if (!isBetween(stdName.length, min, max)) {
    showError(
      stdNameE1,
      `Student name must be between ${min} and ${max} characters.`
    );
  } else if (!isStdNameValid(stdName)) {
    showError(
      stdNameE1,
      "Student name is not valid, the every first letter of ur name should start with a capital letter. "
    );
    //calling the showsuccess function with two arguments
  } else {
    showSuccess(stdNameE1);
    valid = true;
  }
  return valid;
};

//Regular expression to validate the student name pattern
const isStdNameValid = (stdtName) => {
  const re =
    /^([A-Z]{1}[a-zA-Z]+)(\s[A-Z]{1}[a-zA-Z]+)?(\s[A-Z]{1}[a-zA-Z]+)?$/;
  return re.test(stdtName);
};

//reusable code
//Function to check whether the input section is empty or not
const isRequired = (value) => (value === "" ? false : true);
//Function to check the length of the the character in the input section
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//reusable code
//Regulating the css classes according to the validation
const showError = (input, message) => {
  //get the form field element
  const formField = input.parentElement;
  //add the error class
  formField.classList.remove("success");
  formField.classList.add("error");
  //show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  //get the form field element
  const formField = input.parentElement;
  //remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");
  //hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};
