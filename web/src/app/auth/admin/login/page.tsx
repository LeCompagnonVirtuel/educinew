'use client';
import RoleLoginPage from '@/components/auth/RoleLoginPage';

export default function AdminLoginPage() {
  return (
    <RoleLoginPage
      role="admin"
      icon="🏫"
      gradient="from-primary to-secondary"
      titleFr="Établissement"
      titleEn="School"
      descFr="Accédez à votre tableau de bord administrateur"
      descEn="Access your administrator dashboard"
      fieldLabelFr="Adresse email"
      fieldLabelEn="Email Address"
      fieldPlaceholder="admin@ecole.ci"
      fieldType="email"
      showForgotPassword={true}
    />
  );
}
