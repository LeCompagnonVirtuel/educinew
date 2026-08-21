import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { NavigationContainer, LinkingOptions, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ChildProvider } from './context/ChildContext';
import { useNotifications, setGlobalNavigator } from './hooks/useNotifications';

// Auth Screens (keep eager — shown on cold start)
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ActivateAccountScreen from './screens/RegisterScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import QRLoginScreen from './screens/QRLoginScreen';
import FirstLoginScreen from './screens/FirstLoginScreen';

// Core screens (shown immediately after login)
import HomeScreen from './tabs/HomeScreen';
import ProfileScreen from './tabs/ProfileScreen';

// Lazy-loaded screens (only loaded when navigated to)
const GradesScreen = lazy(() => import('./tabs/GradesScreen'));
const PaymentsScreen = lazy(() => import('./tabs/PaymentsScreen'));
const MessagesScreen = lazy(() => import('./tabs/MessagesScreen'));
const TransportScreen = lazy(() => import('./tabs/TransportScreen'));
const MarketplaceScreen = lazy(() => import('./tabs/MarketplaceScreen'));
const CoursesScreen = lazy(() => import('./tabs/CoursesScreen'));
const AIScreen = lazy(() => import('./tabs/AIScreen'));
const ChildProfileScreen = lazy(() => import('./screens/ChildProfileScreen'));
const ReportCardScreen = lazy(() => import('./screens/ReportCardScreen'));
const AttendanceHistoryScreen = lazy(() => import('./screens/AttendanceHistoryScreen'));
const ExamPrepScreen = lazy(() => import('./screens/ExamPrepScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
const TeacherSettingsScreen = lazy(() => import('./screens/TeacherSettingsScreen'));
const MakePaymentScreen = lazy(() => import('./screens/MakePaymentScreen'));
const PaymentConfirmationScreen = lazy(() => import('./screens/PaymentConfirmationScreen'));
const TeacherCheckinScreen = lazy(() => import('./screens/TeacherCheckinScreen'));
const QRScannerScreen = lazy(() => import('./screens/QRScannerScreen'));
const NotificationsScreen = lazy(() => import('./screens/NotificationsScreen'));
const StudentScheduleScreen = lazy(() => import('./screens/StudentScheduleScreen'));
const AdminRedirectScreen = lazy(() => import('./screens/AdminRedirectScreen'));
const QRBadgeScreen = lazy(() => import('./screens/QRBadgeScreen'));
const DocumentViewerScreen = lazy(() => import('./screens/DocumentViewerScreen'));
const StaffCheckinScreen = lazy(() => import('./screens/StaffCheckinScreen'));
const SurveillanceScreen = lazy(() => import('./screens/SurveillanceScreen'));
const VisitorRegisterScreen = lazy(() => import('./screens/VisitorRegisterScreen'));
const PremiumCheckInScreen = lazy(() => import('./screens/PremiumCheckInScreen'));
const PremiumAttendanceHistoryScreen = lazy(() => import('./screens/PremiumAttendanceHistoryScreen'));
const PremiumQRScannerScreen = lazy(() => import('./screens/PremiumQRScannerScreen'));

// Teacher screens (lazy)
const TeacherDashboardScreen = lazy(() => import('./tabs/TeacherDashboardScreen'));
const TeacherClassesScreen = lazy(() => import('./tabs/TeacherClassesScreen'));
const TeacherAttendanceScreen = lazy(() => import('./tabs/TeacherAttendanceScreen'));
const TeacherGradesScreen = lazy(() => import('./tabs/TeacherGradesScreen'));
const TeacherScheduleScreen = lazy(() => import('./tabs/TeacherScheduleScreen'));
const TeacherAssignmentsScreen = lazy(() => import('./tabs/TeacherAssignmentsScreen'));
const StudentAssignmentsScreen = lazy(() => import('./screens/StudentAssignmentsScreen'));
const QuizScreen = lazy(() => import('./screens/QuizScreen'));
const AnnouncementsScreen = lazy(() => import('./screens/AnnouncementsScreen'));
const StudentDocumentsScreen = lazy(() => import('./screens/StudentDocumentsScreen'));

// Parent screens (lazy)
const ParentDashboardScreen = lazy(() => import('./tabs/ParentDashboardScreen'));
const ParentGradesScreen = lazy(() => import('./screens/ParentGradesScreen'));
const ParentAttendanceScreen = lazy(() => import('./screens/ParentAttendanceScreen'));
const ParentScheduleScreen = lazy(() => import('./screens/ParentScheduleScreen'));
const ParentDocumentsScreen = lazy(() => import('./screens/ParentDocumentsScreen'));

// Role-specific dashboard screens (lazy)
const ComptableDashboardScreen = lazy(() => import('./tabs/ComptableDashboardScreen'));
const SurveillantDashboardScreen = lazy(() => import('./tabs/SurveillantDashboardScreen'));
const DriverScreen = lazy(() => import('./screens/DriverScreen'));

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LoginScreen: { schoolCode?: string; branding?: any } | undefined;
  ForgotPasswordScreen: undefined;
  ActivateAccount: { token?: string } | undefined;
  OTPVerification: { email: string; userId?: string } | undefined;
  QRLogin: undefined;
  FirstLogin: { tempPassword?: string } | undefined;
};

export type MainStackParamList = {
  Home: undefined;
  ParentDashboard: undefined;
  ParentGrades: undefined;
  ParentAttendance: undefined;
  ParentSchedule: undefined;
  ParentDocuments: undefined;
  ComptableDashboard: undefined;
  SurveillantDashboard: undefined;
  DriverHome: undefined;
  AdminRedirect: undefined;
  Learning: { subjectId?: string } | undefined;
  Payments: { paymentId?: string } | undefined;
  Messages: { conversationId?: string } | undefined;
  Profile: undefined;
  Transport: undefined;
  Marketplace: undefined;
  Courses: undefined;
  AI: undefined;
  ChildProfile: { studentId: string };
  ReportCard: { studentId: string; period?: string };
  AttendanceHistory: { studentId?: string };
  ExamPrep: undefined;
  Settings: undefined;
  MakePayment: { type?: string; reference?: string } | undefined;
  PaymentConfirmation: { reference: string; status: string };
  TeacherDashboard: undefined;
  TeacherClasses: { classId?: string } | undefined;
  TeacherAttendance: { classId?: string; date?: string } | undefined;
  TeacherGrades: { classId?: string; subjectId?: string } | undefined;
  TeacherSchedule: undefined;
  TeacherAssignments: { classId?: string } | undefined;
  TeacherSettings: undefined;
  TeacherCheckin: undefined;
  QRScanner: { type?: 'ARRIVAL' | 'DEPARTURE' | 'CANTEEN' | 'LIBRARY' | 'EXAM' | 'EVENT' } | undefined;
  QRBadge: undefined;
  DocumentViewer: undefined;
  Notifications: undefined;
  StudentSchedule: undefined;
  StudentAssignments: undefined;
  Quiz: { quizId?: string } | undefined;
  Announcements: undefined;
  StudentDocuments: undefined;
  StaffCheckin: undefined;
  Surveillance: undefined;
  VisitorRegister: undefined;
  PremiumCheckIn: undefined;
  PremiumAttendanceHistory: undefined;
  PremiumQRScanner: { type?: 'ARRIVAL' | 'DEPARTURE' | 'CANTEEN' | 'LIBRARY' | 'EXAM' | 'EVENT' } | undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList & MainStackParamList & { Main: undefined }>();

const linking: LinkingOptions<Record<string, any>> = {
  prefixes: ['educi://', 'https://educi.live'],
  config: {
    screens: {
      Splash: 'splash',
      Onboarding: 'onboarding',
      LoginScreen: 'login',
      ForgotPasswordScreen: 'forgot-password',
      ActivateAccount: 'activate/:token',
      OTPVerification: 'verification',
      QRLogin: 'qr-login',
      FirstLogin: 'first-login',
      Main: {
        screens: {
          Home: 'home',
          Learning: 'learning',
          Payments: 'payments/:paymentId?',
          Messages: 'messages/:conversationId?',
          Profile: 'profile',
          Transport: 'transport',
          Marketplace: 'marketplace',
          Courses: 'courses',
          AI: 'ai',
          ChildProfile: 'child/:studentId',
          ReportCard: 'report-card/:studentId',
          AttendanceHistory: 'attendance',
          ExamPrep: 'exam-prep',
          Settings: 'settings',
          MakePayment: 'pay',
          PaymentConfirmation: 'payment/success/:reference',
          TeacherDashboard: 'teacher',
          TeacherClasses: 'teacher/classes/:classId?',
          TeacherAttendance: 'teacher/attendance',
          TeacherGrades: 'teacher/grades',
          TeacherSchedule: 'teacher/schedule',
          TeacherAssignments: 'teacher/assignments',
          TeacherSettings: 'teacher/settings',
          TeacherCheckin: 'teacher/checkin',
          QRScanner: 'qr-scanner',
          QRBadge: 'qr-badge',
          DocumentViewer: 'documents',
          Notifications: 'notifications',
          StudentSchedule: 'schedule',
          StudentAssignments: 'student/assignments',
          StudentDocuments: 'student/documents',
          Quiz: 'student/quiz',
          StaffCheckin: 'staff/checkin',
          Surveillance: 'surveillance',
          VisitorRegister: 'visitors',
          PremiumCheckIn: 'check-in',
          PremiumAttendanceHistory: 'attendance-history',
          PremiumQRScanner: 'qr-scanner-premium',
          ParentDashboard: 'parent',
          ParentGrades: 'parent/grades',
          ParentAttendance: 'parent/attendance',
          ParentSchedule: 'parent/schedule',
          ParentDocuments: 'parent/documents',
          ComptableDashboard: 'comptable',
          SurveillantDashboard: 'surveillant',
          DriverHome: 'driver',
          Announcements: 'announcements',
        },
      },
    },
  },
};

function withSuspense(LazyComponent: React.LazyExoticComponent<React.FC<any>>) {
  const Wrapped = (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
  Wrapped.displayName = `Lazy(${(LazyComponent as any).displayName || 'Component'})`;
  return Wrapped;
}

const LazyGrades = withSuspense(GradesScreen);
const LazyPayments = withSuspense(PaymentsScreen);
const LazyMessages = withSuspense(MessagesScreen);
const LazyTransport = withSuspense(TransportScreen);
const LazyMarketplace = withSuspense(MarketplaceScreen);
const LazyCourses = withSuspense(CoursesScreen);
const LazyAI = withSuspense(AIScreen);
const LazyChildProfile = withSuspense(ChildProfileScreen);
const LazyReportCard = withSuspense(ReportCardScreen);
const LazyAttendanceHistory = withSuspense(AttendanceHistoryScreen);
const LazyExamPrep = withSuspense(ExamPrepScreen);
const LazySettings = withSuspense(SettingsScreen);
const LazyTeacherSettings = withSuspense(TeacherSettingsScreen);
const LazyMakePayment = withSuspense(MakePaymentScreen);
const LazyPaymentConfirmation = withSuspense(PaymentConfirmationScreen);
const LazyTeacherCheckin = withSuspense(TeacherCheckinScreen);
const LazyQRScanner = withSuspense(QRScannerScreen);
const LazyNotifications = withSuspense(NotificationsScreen);
const LazyStudentSchedule = withSuspense(StudentScheduleScreen);
const LazyAdminRedirect = withSuspense(AdminRedirectScreen);
const LazyQRBadge = withSuspense(QRBadgeScreen);
const LazyDocumentViewer = withSuspense(DocumentViewerScreen);
const LazyStaffCheckin = withSuspense(StaffCheckinScreen);
const LazySurveillance = withSuspense(SurveillanceScreen);
const LazyVisitorRegister = withSuspense(VisitorRegisterScreen);
const LazyPremiumCheckIn = withSuspense(PremiumCheckInScreen);
const LazyPremiumAttendanceHistory = withSuspense(PremiumAttendanceHistoryScreen);
const LazyPremiumQRScanner = withSuspense(PremiumQRScannerScreen);
const LazyTeacherDashboard = withSuspense(TeacherDashboardScreen);
const LazyTeacherClasses = withSuspense(TeacherClassesScreen);
const LazyTeacherAttendance = withSuspense(TeacherAttendanceScreen);
const LazyTeacherGrades = withSuspense(TeacherGradesScreen);
const LazyTeacherSchedule = withSuspense(TeacherScheduleScreen);
const LazyTeacherAssignments = withSuspense(TeacherAssignmentsScreen);
const LazyStudentAssignments = withSuspense(StudentAssignmentsScreen);
const LazyQuiz = withSuspense(QuizScreen);
const LazyAnnouncements = withSuspense(AnnouncementsScreen);
const LazyStudentDocuments = withSuspense(StudentDocumentsScreen);
const LazyParentDashboard = withSuspense(ParentDashboardScreen);
const LazyParentGrades = withSuspense(ParentGradesScreen);
const LazyParentAttendance = withSuspense(ParentAttendanceScreen);
const LazyParentSchedule = withSuspense(ParentScheduleScreen);
const LazyParentDocuments = withSuspense(ParentDocumentsScreen);
const LazyComptableDashboard = withSuspense(ComptableDashboardScreen);
const LazySurveillantDashboard = withSuspense(SurveillantDashboardScreen);
const LazyDriverScreen = withSuspense(DriverScreen);

// Parent Navigator (dedicated)
function ParentNavigatorInner() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
        contentStyle: { backgroundColor: '#080E1E' },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="ParentDashboard" component={LazyParentDashboard} />
      <Stack.Screen name="ParentGrades" component={LazyParentGrades} />
      <Stack.Screen name="ParentAttendance" component={LazyParentAttendance} />
      <Stack.Screen name="ParentSchedule" component={LazyParentSchedule} />
      <Stack.Screen name="ParentDocuments" component={LazyParentDocuments} />
      <Stack.Screen name="Payments" component={LazyPayments} />
      <Stack.Screen name="Messages" component={LazyMessages} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={LazySettings} />
      <Stack.Screen name="QRBadge" component={LazyQRBadge} options={{ title: 'Mon Badge QR' }} />
      <Stack.Screen name="ChildProfile" component={LazyChildProfile} />
      <Stack.Screen name="ReportCard" component={LazyReportCard} />
      <Stack.Screen name="MakePayment" component={LazyMakePayment} />
      <Stack.Screen name="PaymentConfirmation" component={LazyPaymentConfirmation} />
      <Stack.Screen name="Notifications" component={LazyNotifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Announcements" component={LazyAnnouncements} options={{ title: 'Annonces' }} />
      <Stack.Screen name="DocumentViewer" component={LazyDocumentViewer} />
      <Stack.Screen name="Transport" component={LazyTransport} />
    </Stack.Navigator>
  );
}

function ParentNavigator() {
  return (
    <ChildProvider>
      <ParentNavigatorInner />
    </ChildProvider>
  );
}

// Student Navigator
function StudentNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
        contentStyle: { backgroundColor: '#080E1E' },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Learning" component={LazyGrades} />
      <Stack.Screen name="Payments" component={LazyPayments} />
      <Stack.Screen name="Messages" component={LazyMessages} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Transport" component={LazyTransport} />
      <Stack.Screen name="Marketplace" component={LazyMarketplace} />
      <Stack.Screen name="Courses" component={LazyCourses} />
      <Stack.Screen name="AI" component={LazyAI} />
      <Stack.Screen name="ChildProfile" component={LazyChildProfile} />
      <Stack.Screen name="ReportCard" component={LazyReportCard} />
      <Stack.Screen name="AttendanceHistory" component={LazyAttendanceHistory} />
      <Stack.Screen name="ExamPrep" component={LazyExamPrep} />
      <Stack.Screen name="Settings" component={LazySettings} />
      <Stack.Screen name="MakePayment" component={LazyMakePayment} />
      <Stack.Screen name="PaymentConfirmation" component={LazyPaymentConfirmation} />
      <Stack.Screen name="QRScanner" component={LazyQRScanner} />
      <Stack.Screen name="QRBadge" component={LazyQRBadge} />
      <Stack.Screen name="DocumentViewer" component={LazyDocumentViewer} />
      <Stack.Screen name="Notifications" component={LazyNotifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="StudentSchedule" component={LazyStudentSchedule} options={{ title: 'Emploi du temps' }} />
      <Stack.Screen name="StudentAssignments" component={LazyStudentAssignments} options={{ title: 'Mes devoirs' }} />
      <Stack.Screen name="Quiz" component={LazyQuiz} options={{ title: 'Quiz' }} />
      <Stack.Screen name="Announcements" component={LazyAnnouncements} options={{ title: 'Annonces' }} />
      <Stack.Screen name="StudentDocuments" component={LazyStudentDocuments} options={{ title: 'Mes documents' }} />
      <Stack.Screen name="PremiumCheckIn" component={LazyPremiumCheckIn} options={{ title: 'Pointage' }} />
      <Stack.Screen name="PremiumAttendanceHistory" component={LazyPremiumAttendanceHistory} options={{ title: 'Historique' }} />
      <Stack.Screen name="PremiumQRScanner" component={LazyPremiumQRScanner} options={{ title: 'Scanner QR' }} />
    </Stack.Navigator>
  );
}

// Teacher Navigator
function TeacherNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
        contentStyle: { backgroundColor: '#080E1E' },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="TeacherDashboard" component={LazyTeacherDashboard} />
      <Stack.Screen name="TeacherClasses" component={LazyTeacherClasses} />
      <Stack.Screen name="TeacherAttendance" component={LazyTeacherAttendance} />
      <Stack.Screen name="TeacherGrades" component={LazyTeacherGrades} />
      <Stack.Screen name="TeacherSchedule" component={LazyTeacherSchedule} />
      <Stack.Screen name="TeacherAssignments" component={LazyTeacherAssignments} />
      <Stack.Screen name="TeacherSettings" component={LazyTeacherSettings} />
      <Stack.Screen name="TeacherCheckin" component={LazyTeacherCheckin} />
      <Stack.Screen name="Messages" component={LazyMessages} />
      <Stack.Screen name="AI" component={LazyAI} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={LazySettings} />
      <Stack.Screen name="QRBadge" component={LazyQRBadge} />
      <Stack.Screen name="DocumentViewer" component={LazyDocumentViewer} />
      <Stack.Screen name="Notifications" component={LazyNotifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Announcements" component={LazyAnnouncements} options={{ title: 'Annonces' }} />
      <Stack.Screen name="StudentDocuments" component={LazyStudentDocuments} options={{ title: 'Documents' }} />
      <Stack.Screen name="PremiumCheckIn" component={LazyPremiumCheckIn} options={{ title: 'Pointage' }} />
      <Stack.Screen name="PremiumAttendanceHistory" component={LazyPremiumAttendanceHistory} options={{ title: 'Historique' }} />
      <Stack.Screen name="PremiumQRScanner" component={LazyPremiumQRScanner} options={{ title: 'Scanner QR' }} />
    </Stack.Navigator>
  );
}

// Admin Redirect Navigator (ADMIN must use Web platform)
function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#080E1E' },
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="AdminRedirect" component={LazyAdminRedirect} />
    </Stack.Navigator>
  );
}

// Comptable Navigator
function ComptableNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
        contentStyle: { backgroundColor: '#080E1E' },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="ComptableDashboard" component={LazyComptableDashboard} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Payments" component={LazyPayments} />
      <Stack.Screen name="Messages" component={LazyMessages} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={LazySettings} />
      <Stack.Screen name="QRBadge" component={LazyQRBadge} options={{ title: 'Mon Badge QR' }} />
      <Stack.Screen name="MakePayment" component={LazyMakePayment} />
      <Stack.Screen name="PaymentConfirmation" component={LazyPaymentConfirmation} />
      <Stack.Screen name="Notifications" component={LazyNotifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="PremiumCheckIn" component={LazyPremiumCheckIn} options={{ title: 'Pointage' }} />
      <Stack.Screen name="PremiumAttendanceHistory" component={LazyPremiumAttendanceHistory} options={{ title: 'Historique' }} />
    </Stack.Navigator>
  );
}

// Staff Navigator (SECRETAIRE, CENSEUR, SURVEILLANT)
function StaffNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
        contentStyle: { backgroundColor: '#080E1E' },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="SurveillantDashboard" component={LazySurveillantDashboard} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Learning" component={LazyGrades} />
      <Stack.Screen name="Payments" component={LazyPayments} />
      <Stack.Screen name="Messages" component={LazyMessages} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={LazySettings} />
      <Stack.Screen name="AttendanceHistory" component={LazyAttendanceHistory} />
      <Stack.Screen name="Notifications" component={LazyNotifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="QRScanner" component={LazyQRScanner} />
      <Stack.Screen name="QRBadge" component={LazyQRBadge} />
      <Stack.Screen name="StaffCheckin" component={LazyStaffCheckin} options={{ title: 'Mon Pointage' }} />
      <Stack.Screen name="Surveillance" component={LazySurveillance} options={{ title: 'Surveillance' }} />
      <Stack.Screen name="VisitorRegister" component={LazyVisitorRegister} options={{ title: 'Visiteurs' }} />
      <Stack.Screen name="PremiumCheckIn" component={LazyPremiumCheckIn} options={{ title: 'Pointage Premium' }} />
      <Stack.Screen name="PremiumAttendanceHistory" component={LazyPremiumAttendanceHistory} options={{ title: 'Historique' }} />
      <Stack.Screen name="PremiumQRScanner" component={LazyPremiumQRScanner} options={{ title: 'Scanner QR' }} />
    </Stack.Navigator>
  );
}

// Driver Navigator (CHAUFFEUR)
function DriverNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
        contentStyle: { backgroundColor: '#080E1E' },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="DriverHome" component={LazyDriverScreen} />
      <Stack.Screen name="Messages" component={LazyMessages} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={LazySettings} />
      <Stack.Screen name="Notifications" component={LazyNotifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Transport" component={LazyTransport} />
    </Stack.Navigator>
  );
}

function getNavigatorForRole(role?: string) {
  switch (role) {
    case 'TEACHER':
      return TeacherNavigator;
    case 'PARENT':
      return ParentNavigator;
    case 'STUDENT':
      return StudentNavigator;
    case 'ADMIN':
      return AdminNavigator;
    case 'COMPTABLE':
      return ComptableNavigator;
    case 'SECRETAIRE':
    case 'CENSEUR':
    case 'SURVEILLANT':
      return StaffNavigator;
    case 'CHAUFFEUR':
    case 'DRIVER':
      return DriverNavigator;
    default:
      // SECURITY: Unknown roles get no navigator — forces logout/re-login
      return null;
  }
}

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#6C63FF" />
    </View>
  );
}

function useNotificationSetup(navigationRef: React.RefObject<NavigationContainerRef<any> | null>) {
  useEffect(() => {
    setGlobalNavigator((route: string, params?: any) => {
      if (navigationRef.current?.isReady()) {
        navigationRef.current.navigate(route as any, params as any);
      }
    });
  }, [navigationRef]);

  useNotifications();
}

function AppContent() {
  const { user, token, loading, isFirstLogin } = useAuth();
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [splashDone, setSplashDone] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string>('LoginScreen');

  useNotificationSetup(navigationRef);

  if (!splashDone) {
    return (
      <NavigationContainer ref={navigationRef} fallback={<LoadingScreen />}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            contentStyle: { backgroundColor: '#080E1E' },
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="Splash">
            {(props) => (
              <SplashScreen
                {...props}
                navigation={{
                  replace: (dest: string) => {
                    setInitialRoute(dest);
                    setSplashDone(true);
                  },
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (loading) return <LoadingScreen />;

  const MainNavigator = user ? getNavigatorForRole(user.role) : null;

  // SECURITY: If user has a token but unknown role, force logout
  if (user && token && !MainNavigator && !isFirstLogin) {
    return (
      <NavigationContainer linking={linking} ref={navigationRef} fallback={<LoadingScreen />}>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#080E1E' } }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer linking={linking} ref={navigationRef} fallback={<LoadingScreen />}>
      <Stack.Navigator
        initialRouteName={token ? (isFirstLogin ? 'FirstLogin' : 'Main') : initialRoute as any}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300,
          contentStyle: { backgroundColor: '#080E1E' },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {!token ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="ActivateAccount" component={ActivateAccountScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="QRLogin" component={QRLoginScreen} options={{ animation: 'slide_from_bottom' }} />
          </>
        ) : isFirstLogin ? (
          <Stack.Screen name="FirstLogin" component={FirstLoginScreen} options={{ animation: 'fade', gestureEnabled: false }} />
        ) : MainNavigator ? (
          <Stack.Screen name="Main" component={MainNavigator} options={{ animation: 'fade', gestureEnabled: false }} />
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080E1E',
  },
});
