import validator from "email-validator";

export const signUpPrecheck = (name, email, password) => {
  if (password.length < 6) {
    throw new Error("short password");
  } else if (name.length < 3) {
    throw new Error("short name");
  } else if (name.length > 15) {
    throw new Error("name too long");
  } else if (!validator.validate(email)) {
    throw new Error("invalid email");
  }
};

export const logInPrecheck = (email, password) => {
  if (password.length < 6) {
    throw new Error("short password");
  } else if (!validator.validate(email)) {
    throw new Error("invalid email");
  }
};
