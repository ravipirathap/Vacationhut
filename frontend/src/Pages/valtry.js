import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object({
    email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Invalid Email").required('Email is required'),
    phoneNumber: yup
      .string()
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/i, 'Invalid phone number')
      .required('Phone number is required'),
      // Example formats: AB1234567 or A12345678 (2 or 1 letter followed by 7 or 8 digits
    passportNumber: yup.string().matches(/^[A-Z]{1,2}[0-9]{7,8}$/i,"Invalid Passport Number").required('Passport number is required'),
    // Format: nnnnnnnnnV or nnnnnnnnnX (9 digits followed by 'V' or 'X')
    nic: yup.string().matches(/^[0-9]{9}[VX]$/i,"Invalid Nic Number").required('NIC is required'),
  });
  const MyForm = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
        phoneNumber: '',
        passportNumber: '',
        nic: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // Handle form submission
        console.log(values);
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <label>email</label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label>phone number</label>
  
        <input
          type="text"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}
        <label>passport</label>
  
        <input
          type="text"
          name="passportNumber"
          value={formik.values.passportNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.passportNumber && formik.errors.passportNumber ? (
          <div>{formik.errors.passportNumber}</div>
        ) : null}
        <label>nic</label>
  
        <input
          type="text"
          name="nic"
          value={formik.values.nic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nic && formik.errors.nic ? (
          <div>{formik.errors.nic}</div>
        ) : null}
  
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default MyForm;
    