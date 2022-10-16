export interface authData {
    displayName: number;
    name: string;
    length: string;
}

  // Define the ProviderData interface
  interface ProviderData {
    // Define provider data properties here
  }
  interface Auth {
    displayName: any;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: Metadata;
    phoneNumber: any;
    photoURL: any;
    providerData: ProviderData[][];
    providerId: string;
    tenantId: any;
    uid: string;
  }
 export class AuthInfo {
    // Define the AuthInfo interface
    displayName: any;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: Metadata;
    phoneNumber: any;
    photoURL: any;
    providerData: ProviderData[][];
    providerId: string;
    tenantId: any;
    uid: string;
  
    constructor(authInfo?: Auth) {
      if (authInfo) {
        // Initialize the properties using the provided AuthInfo
        this.displayName = authInfo.displayName;
        this.email = authInfo.email;
        this.emailVerified = authInfo.emailVerified;
        this.isAnonymous = authInfo.isAnonymous;
        this.metadata = authInfo.metadata;
        this.phoneNumber = authInfo.phoneNumber;
        this.photoURL = authInfo.photoURL;
        this.providerData = authInfo.providerData;
        this.providerId = authInfo.providerId;
        this.tenantId = authInfo.tenantId;
        this.uid = authInfo.uid;
      } else {
        // Initialize properties to default values if authInfo is undefined
        this.displayName = null;
        this.email = '';
        this.emailVerified = false;
        this.isAnonymous = false;
        this.metadata = {} as Metadata;
        this.phoneNumber = null;
        this.photoURL = null;
        this.providerData = [[]];
        this.providerId = '';
        this.tenantId = null;
        this.uid = '';
      }
    }
  }

export interface Metadata {
    creationTime: number
    lastSignInTime: number
}

export interface ProviderDaum { }