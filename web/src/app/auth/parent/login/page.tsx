'use client';
import RoleLoginPage from '@/components/auth/RoleLoginPage';

export default function ParentLoginPage() {
  return (
    <RoleLoginPage
      role="parent"
      icon="👨‍👩‍👧"
      gradient="from-[#D97706] to-[#F59E0B]"
      titleFr="Parent"
      titleEn="Parent"
      descFr="Suivez la scolarité de vos enfants"
      descEn="Track your children's education"
      fieldLabelFr="Email ou téléphone"
      fieldLabelEn="Email or Phone"
      fieldPlaceholder="+225 07 00 00 00"
      fieldType="text"
      showForgotPassword={true}
    />
  );
}
