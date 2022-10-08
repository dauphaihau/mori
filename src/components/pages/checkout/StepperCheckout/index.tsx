import { useEffect, useState } from "react";

import FirstStepCheckout from "./FirstStepCheckout";
import SecondStepCheckout from "./SecondStepCheckout";
import ThirdStepCheckout from "./ThirdStepCheckout";
import { Stepper, Box } from "core/components";

const StepperCheckout = ({ context }) => {
  const { step } = context

  const stepsContent = [
    {
      id: 1,
      heading: 'Cart',
      content: () => <FirstStepCheckout/>,
    },
    {
      id: 2,
      heading: 'Billing & address',
      content: () => <SecondStepCheckout/>
    },
    {
      id: 3,
      heading: 'Payment',
      content: () => <ThirdStepCheckout/>
    },
  ];

  const [currentStep, setCurrentStep] = useState(stepsContent[0]);

  useEffect(() => {
    const handleStepClick = (currentStep) => {
      const currentStepContent = stepsContent?.filter(item => item.id === currentStep);
      setCurrentStep(currentStepContent[0]);
    };
    handleStepClick(step)
    return () => {
    }
  }, [step])

  return (
    <>
      <Stepper>
        <Stepper.Label
          labels={stepsContent}
          step={step}
        />
      </Stepper>
      <Box>{currentStep.content().type(context)}</Box>
    </>
  );
}

export default StepperCheckout;
