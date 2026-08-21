'use client';
import RoleLoginPage from '@/components/auth/RoleLoginPage';

export default function TeacherLoginPage() {
  return (
    <RoleLoginPage
      role="teacher"
      icon="📚"
      gradient="from-[#059669] to-[#10B981]"
      titleFr="Professeur"
      titleEn="Teacher"
      descFr="Gérez vos classes, notes et présences"
      descEn="Manage your classes, grades and attendance"
      fieldLabelFr="Email ou téléphone"
      fieldLabelEn="Email or Phone"
      fieldPlaceholder="professeur@ecole.ci"
      fieldType="text"
      showForgotPassword={true}
    />
  );
}
