import { supabase } from "../auth/supabaseClient";

// Dev-only helper. Production builds never import this module.
// Clears the onboarding gate, deletes this user's brand rows, and refreshes
// the session so the app renders onboarding again.
export async function restartOnboarding(userId, { clearLocalBrands } = {}) {
  if (!userId) {
    throw new Error("Restart onboarding requires a signed-in user.");
  }

  const { error: deleteError } = await supabase
    .from("brands")
    .delete()
    .eq("user_id", userId);
  if (deleteError) throw deleteError;

  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      onboarding_complete: false,
      onboarding_answers: null,
    },
  });
  if (updateError) throw updateError;

  if (typeof clearLocalBrands === "function") {
    clearLocalBrands();
  }

  const { error: refreshError } = await supabase.auth.refreshSession();
  if (refreshError) {
    // updateUser already stored the cleared metadata and notified listeners.
    // A failed refresh should not undo that or look like the reset failed.
    console.warn(
      "[DSG] Onboarding was reset, but the session could not be refreshed:",
      refreshError,
    );
  }
}
