'use client';

import { useRegistration } from '@/components/registration/RegistrationContext';
import StepWelcome from './steps/StepWelcome';
import StepPersonal from './steps/StepPersonal';
import StepSchool from './steps/StepSchool';
import StepLocation from './steps/StepLocation';
import StepContacts from './steps/StepContacts';
import StepBranding from './steps/StepBranding';
import StepAcademic from './steps/StepAcademic';
import StepModules from './steps/StepModules';
import StepPayments from './steps/StepPayments';
import StepSecurity from './steps/StepSecurity';
import StepReview from './steps/StepReview';
import StepSubmit from './steps/StepSubmit';

export default function RegisterPage() {
  const { currentStep } = useRegistration();

  const stepComponents: Record<number, React.ReactNode> = {
    0: <StepWelcome />,
    1: <StepPersonal />,
    2: <StepSchool />,
    3: <StepLocation />,
    4: <StepContacts />,
    5: <StepBranding />,
    6: <StepAcademic />,
    7: <StepModules />,
    8: <StepPayments />,
    9: <StepSecurity />,
    10: <StepReview />,
    11: <StepSubmit />,
  };

  return stepComponents[currentStep] || <StepWelcome />;
}
