import FormInputError from "./error";

const Input = ({ formik, name, type, value, ...rest }) => {
  if (type === "radio") {
    return (
      <>
        {" "}
        <input
          type={type}
          checked={formik?.values?.[name] === value}
          onChange={() => formik?.setFieldValue(name, value)}
          {...rest}
        />
      </>
    );
  } else {
    return (
      <>
        {" "}
        <input
          value={formik?.values?.[name]}
          onChange={(e) => formik?.setFieldValue(name, e.target.value)}
          {...rest}
        />
        <FormInputError formik={formik} name={name} />
      </>
    );
  }
};
export default Input;
