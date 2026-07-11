import { useEffect, useState } from "react";
import { supabase } from "./auth/supabaseClient";
import { AuthScreen } from "./auth/AuthScreen";
import { RecoveryScreen } from "./auth/RecoveryScreen";
import Landing from "./landing/Landing";
import OnboardingFlow from "./onboarding/OnboardingFlow";
import GeneratorApp from "./generator/GeneratorApp";
import "./generator/index.css";

function App() {
  const [session, setSession] = useState(undefined);
  const [showAuth, setShowAuth] = useState(false);
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (event === "PASSWORD_RECOVERY") {
          setRecovering(true);
        }
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowAuth(false);
  };

  const markOnboardingComplete = async (answers) => {
    await supabase.auth.updateUser({
      data: { onboarding_complete: true, onboarding_answers: answers },
    });
  };

  if (session === undefined) {
    return null;
  }

  if (recovering) {
    return <RecoveryScreen onComplete={() => setRecovering(false)} />;
  }

  if (!session) {
    if (!showAuth) {
      return (
        <Landing
          onGetStarted={() => setShowAuth(true)}
          onSelectTier={() => setShowAuth(true)}
        />
      );
    }
    return <AuthScreen />;
  }

  const onboardingComplete = Boolean(
    session.user.user_metadata?.onboarding_complete,
  );

  return onboardingComplete ? (
    <GeneratorApp userEmail={session.user.email} onLogout={handleLogout} />
  ) : (
    <OnboardingFlow
      onLaunch={markOnboardingComplete}
      userEmail={session.user.email}
      onLogout={handleLogout}
    />
  );
}

export default App;
