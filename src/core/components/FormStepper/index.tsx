import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { FormStepperProps } from "./../../interfaces/props/FormStepperProps";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export function FormStepper(props: FormStepperProps): JSX.Element {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false); // get this from context in future
  const lastElementIndex = props.stepElements.length - 1;

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      if (nextStep > lastElementIndex) {
        // post to /signup
        // loading starts
        // if success navigate to
        // if error show error and stop loading but on last step yet
        // setIsLoading(true);
        // navigate("/");
      }
      return nextStep;
    });
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {props.stepLabels.map((label) => {
          return (
            <Step key={label} completed={false}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        {props.stepElements[activeStep]}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Box sx={{ flex: "1 1 auto" }} />
          {isLoading ? (
            <LoadingButton loading variant="outlined">
              Loading...
            </LoadingButton>
          ) : (
            <Button onClick={handleNext}>
              {activeStep === lastElementIndex ? "Finish" : "Next"}
            </Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
}
