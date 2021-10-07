import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  CircularProgress,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React from "react";
import * as Yup from "yup";
import Header from "../../components/Header";

const initialValues = {
  firstName: "",
  lastName: "",
  millionaire: false,
  money: 0,
  description: "",
};

const validationSchema = Yup.object({
  money: Yup.mixed().when("millionaire", {
    is: true,
    then: Yup.number()
      .required()
      .min(
        100000,
        "Because you said you are a millionaire you need to have 1 million"
      ),
    otherwise: Yup.number().required(),
  }),
});

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const handleFinalSubmit = async (values) => {
  await sleep(3000);
  console.log("values", values);
};

const MultiStepForm = () => {
  return (
    <React.Fragment>
      <Header />
      <Card
        style={{
          width: "80%",
          margin: "80px auto 30px auto",
          padding: "30px",
        }}
      >
        <CardContent>
          <FormikStepper
            initialValues={initialValues}
            onSubmit={handleFinalSubmit}
          >
            <FormikStep label="Personal Data">
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  component={TextField}
                  name="firstName"
                  label="First Name"
                />
              </Box>

              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  component={TextField}
                  name="lastName"
                  label="Last Name"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="millionaire"
                  type="checkbox"
                  component={CheckboxWithLabel}
                  Label={{ label: "I am a millionaire" }}
                />
              </Box>
            </FormikStep>
            <FormikStep label="Bank Info" validationSchema={validationSchema}>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  component={TextField}
                  name="money"
                  type="number"
                  label="All the money I have"
                />
              </Box>
            </FormikStep>
            <FormikStep label="More Info">
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  component={TextField}
                  name="description"
                  label="Description"
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default MultiStepForm;

export const FormikStepper = ({ children, ...props }) => {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;
  const [stepNumber, setStepNumber] = React.useState(0);
  const isLastStep = stepNumber === totalSteps - 1;
  const currentStep = steps[stepNumber];
  const [completed, setCompleted] = React.useState(false);
  const backToPreviousStep = () => {
    setStepNumber((s) => s - 1);
  };

  const sendToNextStep = () => {
    setStepNumber((s) => s + 1);
  };

  const handleSubmit = async (values, helpers) => {
    if (isLastStep) {
      await props.onSubmit(values, helpers);
      setCompleted(true);
    } else {
      sendToNextStep();
      helpers.setTouched({});
    }
  };

  return (
    <Formik
      {...props}
      validationSchema={currentStep.props.validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={stepNumber}>
            {steps.map((child, index) => (
              <Step
                key={child.props.label}
                completed={stepNumber > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentStep}
          <Grid container spacing={2}>
            {stepNumber > 0 && (
              <Grid item>
                <Button
                  onClick={backToPreviousStep}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Back
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export const FormikStep = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};
