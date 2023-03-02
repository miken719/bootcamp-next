function FormInputError(props) {
  const { name, formik } = props;
  return (
    <>
      {formik?.touched[name] && formik?.errors[name] ? (
        <span className="text-danger">{formik?.errors[name]}</span>
      ) : null}
    </>
  );
}
export default FormInputError;
