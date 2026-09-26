export type AuthFeatureIcon = 'desktop' | 'touch' | 'store';

export interface AuthFeature {
  icon: AuthFeatureIcon;
  title: string;
  description: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
