import { Formik } from "formik";
import React, { useState } from "react";

const MultiStepForm = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = () => {
    setStepNumber(stepNumber + 1);
  };
  const previous = () => {
    setStepNumber(stepNumber - 1);
  };
  const handleSubmit = (values) => {};
  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
      validationSchema={{}}
    ></Formik>
  );
};

export default MultiStepForm;
