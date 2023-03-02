import { errorMessages, INPUT_VALIDATOR } from "./constant";
import * as Yup from "yup";
/** ***************** 
  @purpose : Used For Validate Registration Field
  @Parameter : {}
  @Author : INIC
  ***************** */
export const REGISTER_COMPANY_SCHEMA = Yup.object().shape({
  name: Yup.string().required(errorMessages.NAME),

  email: Yup.string()
    .matches(INPUT_VALIDATOR.emailRegExp, errorMessages.EMAIL_VAL)
    .required(errorMessages.EMAIL),
  password: Yup.string()
    .trim()
    .required(errorMessages.PASSWORD)
    .matches(INPUT_VALIDATOR.passwordRegExp, errorMessages.PASSWORD_VAL),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], errorMessages.CONFIRM_PASSWORD_VAL)
    .required(errorMessages.CONFIRM_PASSWORD),
  role: Yup.string().required(errorMessages.ROLE),
});

export const LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .trim()
    .required(errorMessages.EMAIL)
    .matches(INPUT_VALIDATOR.emailRegExp, errorMessages.EMAIL_VAL),
  password: Yup.string().trim().required(errorMessages.PASSWORD),
});
