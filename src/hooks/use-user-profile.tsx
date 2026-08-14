import { createContext, type ReactNode, useContext, useState } from 'react';

export interface UserProfile {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const MOCK_PROFILE: UserProfile = {
  firstName: 'Tom',
  lastName: 'R. Hayes',
  dob: '03/14/1973',
  phone: '+1 (617) 555-0182',
  email: 'tom.hayes@email.com',
  addressLine1: '142 Beacon Street',
  addressLine2: 'Apt 4B',
  city: 'Boston',
  state: 'MA',
  postalCode: '02116',
  country: 'United States',
};

interface UserProfileContextValue {
  profile: UserProfile;
  updateProfile: (values: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  return (
    <UserProfileContext.Provider value={{ profile, updateProfile: setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx)
    throw new Error('useUserProfile must be used within UserProfileProvider');
  return ctx;
}
