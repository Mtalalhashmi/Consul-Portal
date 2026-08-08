import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseAuth";

export const STORAGE_KEYS = {
  APPLICATIONS: "consul_admin_applications",
  PASSPORTS: "consul_admin_passports",
  CLIENTS: "consul_admin_clients",
  PAYMENTS: "consul_admin_payments",
  ACTIVITIES: "consul_admin_activities",
  SETTINGS: "consul_admin_settings",
  DEMAND_LETTERS: "consul_agency_demand_letters",
  EVALUATIONS: "consul_user_evaluations",
  TRACKING_SESSION: "saved_tracking_session"
};

// Generic Local Storage Helpers
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing localStorage key "${key}":`, error);
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}

// --- FIREBASE FIRESTORE SYNC FUNCTIONS ---

/**
 * Timeout helper to avoid blocking on slow or failing network requests to Firestore.
 */
function withTimeout<T>(promise: Promise<T>, ms: number = 3000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Firestore timeout")), ms))
  ]);
}

/**
 * Save a document locally in localStorage and sync it to Firebase Firestore.
 */
export async function syncDocToFirestore(collectionName: string, docId: string, data: any): Promise<boolean> {
  if (!docId) return false;
  
  // Clean docId to ensure valid Firestore document path
  const sanitizedId = String(docId).replace(/\//g, "_");
  
  if (db) {
    try {
      const docRef = doc(db, collectionName, sanitizedId);
      await withTimeout(setDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      }, { merge: true }), 3000);
      console.log(`[DataStore] Synced doc to Firestore: ${collectionName}/${sanitizedId}`);
      return true;
    } catch (err) {
      console.warn(`[DataStore] Firestore write skipped/failed for ${collectionName}/${sanitizedId} (saved locally):`, err);
    }
  }
  return false;
}

/**
 * Fetch all documents from a Firestore collection with timeout.
 */
export async function fetchDocsFromFirestore(collectionName: string): Promise<any[]> {
  if (!db) return [];
  try {
    const querySnapshot = await withTimeout(getDocs(collection(db, collectionName)), 3000);
    const docs: any[] = [];
    querySnapshot.forEach((docSnap) => {
      docs.push({ id: docSnap.id, ...docSnap.data() });
    });
    return docs;
  } catch (err) {
    console.warn(`[DataStore] Failed/timed out fetching docs from Firestore ${collectionName}:`, err);
    return [];
  }
}

/**
 * Delete a document from Firestore.
 */
export async function deleteDocFromFirestore(collectionName: string, docId: string): Promise<boolean> {
  if (!db || !docId) return false;
  const sanitizedId = String(docId).replace(/\//g, "_");
  try {
    await withTimeout(deleteDoc(doc(db, collectionName, sanitizedId)), 3000);
    console.log(`[DataStore] Deleted doc from Firestore: ${collectionName}/${sanitizedId}`);
    return true;
  } catch (err) {
    console.warn(`[DataStore] Failed/timed out deleting doc from Firestore ${collectionName}/${sanitizedId}:`, err);
    return false;
  }
}

// --- DUAL STORAGE ENTITY MANAGERS ---

// 1. Applications
export function getStoredApplications(): any[] {
  return getLocalStorage<any[]>(STORAGE_KEYS.APPLICATIONS, []);
}

export async function saveStoredApplication(app: any): Promise<any[]> {
  const current = getStoredApplications();
  const index = current.findIndex((a) => a.id === app.id);
  let updated: any[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...app, updatedAt: new Date().toISOString() };
  } else {
    updated = [app, ...current];
  }
  setLocalStorage(STORAGE_KEYS.APPLICATIONS, updated);

  // Sync to Firebase
  const firebasePayload = {
    applicantEmail: app.email || "applicant@example.com",
    applicantName: app.name || "Applicant",
    vacancyId: app.vacancyId || "job-1",
    targetCountry: app.country || "Schengen",
    status: app.status || "Pending",
    phone: app.phone || "",
    passportNumber: app.passportNumber || "",
    cnic: app.cnic || "",
    applyingFrom: app.applyingFrom || "Pakistan",
    coverLetter: app.coverLetter || "",
    createdAt: app.createdAt || new Date().toISOString()
  };
  await syncDocToFirestore("applications", app.id, firebasePayload);

  return updated;
}

export async function saveStoredApplicationsBatch(appsList: any[]): Promise<void> {
  setLocalStorage(STORAGE_KEYS.APPLICATIONS, appsList);
  for (const app of appsList) {
    if (app && app.id) {
      await syncDocToFirestore("applications", app.id, app);
    }
  }
}

export async function deleteStoredApplication(appId: string): Promise<any[]> {
  const current = getStoredApplications();
  const updated = current.filter((a) => a.id !== appId);
  setLocalStorage(STORAGE_KEYS.APPLICATIONS, updated);
  await deleteDocFromFirestore("applications", appId);
  return updated;
}

// 2. Passports / Tracking Files
export function getStoredPassports(): any[] {
  return getLocalStorage<any[]>(STORAGE_KEYS.PASSPORTS, []);
}

export async function saveStoredPassport(passport: any): Promise<any[]> {
  const current = getStoredPassports();
  const trackKey = passport.trackId || passport.id;
  const index = current.findIndex((p) => (p.trackId || p.id) === trackKey);
  let updated: any[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...passport, updatedAt: new Date().toISOString() };
  } else {
    updated = [passport, ...current];
  }
  setLocalStorage(STORAGE_KEYS.PASSPORTS, updated);

  // Sync to Firebase
  const firebasePayload = {
    trackId: trackKey,
    passportNum: passport.passportNum || passport.passport_number || "PK1234567",
    candidateName: passport.name || passport.candidateName || "Candidate",
    country: passport.country || "Schengen",
    category: passport.category || "Work Visa",
    referenceNumber: passport.referenceNumber || "",
    candidateEmail: passport.email || "",
    totalFee: passport.totalFee || 0,
    totalPaid: passport.totalPaid || 0,
    steps: passport.steps || []
  };
  await syncDocToFirestore("passports", trackKey, firebasePayload);

  return updated;
}

export async function saveStoredPassportsBatch(passportsList: any[]): Promise<void> {
  setLocalStorage(STORAGE_KEYS.PASSPORTS, passportsList);
  for (const p of passportsList) {
    const trackKey = p.trackId || p.id;
    if (trackKey) {
      await syncDocToFirestore("passports", trackKey, p);
    }
  }
}

// 3. Client Records
export function getStoredClients(): any[] {
  return getLocalStorage<any[]>(STORAGE_KEYS.CLIENTS, []);
}

export async function saveStoredClient(client: any): Promise<any[]> {
  const current = getStoredClients();
  const clientId = client.id || `cli-${Date.now()}`;
  const index = current.findIndex((c) => c.id === clientId || (c.email && c.email.toLowerCase() === (client.email || "").toLowerCase()));
  let updated: any[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...client, updatedAt: new Date().toISOString() };
  } else {
    updated = [{ ...client, id: clientId }, ...current];
  }
  setLocalStorage(STORAGE_KEYS.CLIENTS, updated);

  const firebasePayload = {
    name: client.name || client.fullName || "Client",
    email: client.email || "",
    phone: client.phone || "",
    country: client.country || "Pakistan",
    role: client.role || "client",
    passportNum: client.passportNum || "",
    trackId: client.trackId || "",
    status: client.status || "Active"
  };
  await syncDocToFirestore("users", clientId, firebasePayload);

  return updated;
}

// 4. Payments
export function getStoredPayments(): any[] {
  return getLocalStorage<any[]>(STORAGE_KEYS.PAYMENTS, []);
}

export async function saveStoredPayment(payment: any): Promise<any[]> {
  const current = getStoredPayments();
  const payId = payment.id || `pay-${Date.now()}`;
  const index = current.findIndex((p) => p.id === payId);
  let updated: any[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...payment, updatedAt: new Date().toISOString() };
  } else {
    updated = [{ ...payment, id: payId }, ...current];
  }
  setLocalStorage(STORAGE_KEYS.PAYMENTS, updated);

  await syncDocToFirestore("payments", payId, payment);
  return updated;
}

// 5. Activity Logs
export function getStoredActivities(): any[] {
  return getLocalStorage<any[]>(STORAGE_KEYS.ACTIVITIES, []);
}

export async function addStoredActivity(activity: any): Promise<any[]> {
  const current = getStoredActivities();
  const actId = activity.id || `act-${Date.now()}`;
  const newAct = {
    id: actId,
    timestamp: activity.timestamp || new Date().toISOString(),
    ...activity
  };
  const updated = [newAct, ...current.slice(0, 99)]; // Keep latest 100
  setLocalStorage(STORAGE_KEYS.ACTIVITIES, updated);

  await syncDocToFirestore("activities", actId, newAct);
  return updated;
}

// 6. Settings
export function getStoredSettings(): any {
  return getLocalStorage<any>(STORAGE_KEYS.SETTINGS, {
    whatsAppNum: "923001234567",
    whatsAppDisplay: "+92 300 1234567",
    paymentMethods: []
  });
}

export async function saveStoredSettings(settings: any): Promise<any> {
  setLocalStorage(STORAGE_KEYS.SETTINGS, settings);
  await syncDocToFirestore("settings", "global_config", {
    key: "global_config",
    value: JSON.stringify(settings),
    ...settings
  });
  return settings;
}

// 7. Agency B2B Demand Letters
export function getStoredDemandLetters(): any[] {
  return getLocalStorage<any[]>(STORAGE_KEYS.DEMAND_LETTERS, []);
}

export async function saveStoredDemandLetter(letter: any): Promise<any[]> {
  const current = getStoredDemandLetters();
  const id = letter.refNo || letter.id || `REQ-${Date.now()}`;
  const newLetter = { ...letter, id, createdAt: new Date().toISOString() };
  const updated = [newLetter, ...current];
  setLocalStorage(STORAGE_KEYS.DEMAND_LETTERS, updated);

  await syncDocToFirestore("demand_letters", id, newLetter);
  return updated;
}

// 8. AI User Evaluations
export function getStoredEvaluations(): any[] {
  return getLocalStorage<any[]>(STORAGE_KEYS.EVALUATIONS, []);
}

export async function saveStoredEvaluation(evalItem: any): Promise<any[]> {
  const current = getStoredEvaluations();
  const id = evalItem.id || `EVAL-${Date.now()}`;
  const newItem = { ...evalItem, id, timestamp: new Date().toISOString() };
  const updated = [newItem, ...current];
  setLocalStorage(STORAGE_KEYS.EVALUATIONS, updated);

  await syncDocToFirestore("evaluations", id, newItem);
  return updated;
}
