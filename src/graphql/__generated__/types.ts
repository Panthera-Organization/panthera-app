export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Company = {
  __typename: 'Company';
  id: Scalars['ID']['output'];
  isPersonal: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type CreatePersonalWorkspaceInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum MemberRole {
  Admin = 'ADMIN',
  Owner = 'OWNER',
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export type Membership = {
  __typename: 'Membership';
  canTeach: Scalars['Boolean']['output'];
  /** Null when row policies hide the company. */
  company?: Maybe<Company>;
  id: Scalars['ID']['output'];
  role: MemberRole;
};

export type Mutation = {
  __typename: 'Mutation';
  createPersonalWorkspace: Viewer;
  updateProfile: Viewer;
};


export type MutationCreatePersonalWorkspaceArgs = {
  input: CreatePersonalWorkspaceInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type Profile = {
  __typename: 'Profile';
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  timezone: Scalars['String']['output'];
};

export type Query = {
  __typename: 'Query';
  viewer?: Maybe<Viewer>;
};

export type UpdateProfileInput = {
  fullName?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

/** The signed-in user. Null when the bearer token is missing or invalid. */
export type Viewer = {
  __typename: 'Viewer';
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  memberships: Array<Membership>;
  profile: Profile;
};
