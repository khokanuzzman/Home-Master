export interface authData {
    displayName: number;
    name: string;
    length: string;
}

export interface AuthInfo {
    displayName: any
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    metadata: Metadata
    phoneNumber: any
    photoURL: any
    providerData: ProviderDaum[][]
    providerId: string
    tenantId: any
    uid: string
}

export interface Metadata {
    creationTime: number
    lastSignInTime: number
}

export interface ProviderDaum { }