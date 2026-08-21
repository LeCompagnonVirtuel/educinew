'use client';
import RoleLoginPage from '@/components/auth/RoleLoginPage';

export default function StudentLoginPage() {
  return (
    <RoleLoginPage
      role="student"
      icon="🎓"
      gradient="from-[#DC2626] to-[#EF4444]"
      titleFr="Élève"
      titleEn="Student"
      descFr="Consultez vos notes et examens"
      descEn="View your grades and exams"
      fieldLabelFr="Matricule ou email"
      fieldLabelEn="Student ID or email"
      fieldPlaceholder="16137807D ou email@exemple.com"
      fieldType="text"
      showForgotPassword={true}
    />
  );
}
