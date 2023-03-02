export const errorMessages = {
  NAME: "Enter Name",
  USERNAME: "Enter Username",
  NAME_VAL: "Company name must be between 4-15 characters",
  EMAIL_VAL: "Enter Valid Email Address",
  EMAIL: "Enter Email Address",
  ROLE: "Role is required",
  PASSWORD: "Password Is Required",
  PASSWORD_VAL:
    "Password Must Be 8-12 Character (A-Z,a-z,0-9,Special_Character)",
  CONFIRM_PASSWORD: "Confirm Password Is Required",
  CONFIRM_PASSWORD_VAL: "Confirm Password Doesn't Match",
  TERMS: "Agree Our Terms and conditions",
  PHONE: "Phone Number Is Required",
  PHONE_VAL: "Phone Number Is Not Valid",
  PHONE_LENGTH: "Contact Number Must Be 10 Digit Only",
  NEW_PASSWORD: "New Password And Confirm Password Not Matched",
  URL: "Enter correct link (no whitespace)",
  URL_REQUIRED: "URL Is Required",
  OTP: "Otp Number Is Required",
  OTP_VAL: "Enter Valid OTP",
};
export const INPUT_VALIDATOR = {
  phoneRegExp: /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/,
  userNameRegex: /^\S*$/,
  passwordRegExp:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  emailRegExp:
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  otpRegExp: /[0-9]{4,4}$/,

  httpsRegex:
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
};
