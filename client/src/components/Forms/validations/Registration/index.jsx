import * as yup from "yup";

const Registration =  yup.object().shape({
  FirstName: yup.string().required("firstName is Required!"),
  lastName: yup.string().required("lastName is Required!"),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
  confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });
  export default Registration