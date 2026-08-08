import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as fbSignOut, onAuthStateChanged, User } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

let app: any;
let auth: any;
let db: any;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  auth = getAuth(app);
  db = (firebaseConfig as any).firestoreDatabaseId 
    ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
    : getFirestore(app);
} catch (err) {
  console.warn("Firebase Initialization error:", err);
  app = getApps().length > 0 ? getApp() : null;
  auth = app ? getAuth(app) : null;
  db = app ? getFirestore(app) : null;
}

export { auth, db };

// Optional Connection check function (not called on module boot to prevent 10s timeout warnings)
export async function testConnection() {
  if (!db) return false;
  try {
    const docRef = doc(db, 'test', 'connection');
    await getDocFromServer(docRef);
    return true;
  } catch (error) {
    console.warn("[Firebase] Offline mode active.");
    return false;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = auth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Note: ', JSON.stringify(errInfo));
  return errInfo;
}

// Initialize Analytics safely
export let analytics: any = null;
if (app && typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        // Silently ignore analytics fetch errors in sandboxed iframes
      }
    }
  }).catch(() => {
    // Silently ignore analytics fail
  });
}

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/gmail.send");
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGmail = async (): Promise<{ user: User; accessToken: string }> => {
  if (!auth) {
    throw {
      code: "auth/unauthorized-domain",
      message: "Firebase Auth not initialized."
    };
  }
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential || !credential.accessToken) {
      throw new Error("Failed to retrieve Google OAuth access token.");
    }
    return {
      user: result.user,
      accessToken: credential.accessToken
    };
  } catch (error: any) {
    console.warn("Firebase Sign-In Error (handled):", error?.message || error);
    throw error;
  }
};

export const signOutGmail = async () => {
  if (auth && typeof fbSignOut === "function") {
    await fbSignOut(auth);
  }
};
