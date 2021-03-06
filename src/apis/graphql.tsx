import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String'];
  user: User;
};

export type AuthState = LoggedInState | NonLoggedInState;

export type CreateRepositoryInput = {
  address: Scalars['String'];
};

export type LoggedInState = {
  __typename?: 'LoggedInState';
  accessToken: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new user account using the provided credentials and profile. */
  signUp: Auth;
  /** Authenticates the user using the provided credentials. */
  signIn: Auth;
  /** Generates a new access token using the current refresh token stored in cookies. */
  refreshToken: Scalars['String'];
  /** Creates a new git repository using the provided input. */
  createRepository: Repository;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationCreateRepositoryArgs = {
  input: CreateRepositoryInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type NonLoggedInState = {
  __typename?: 'NonLoggedInState';
  isLoggedIn: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  authState: AuthState;
  /** Returns an existing resource using its node identifier. */
  node?: Maybe<Node>;
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type Repository = {
  __typename?: 'Repository';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  removedAt?: Maybe<Scalars['DateTime']>;
  address: Scalars['String'];
};

export type SignInInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpDomainInput = {
  name: Scalars['String'];
  address: Scalars['String'];
};

export type SignUpInput = {
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
  domain: SignUpDomainInput;
  primaryEmail: SignUpPrimaryEmailInput;
};

export type SignUpPrimaryEmailInput = {
  address: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  removedAt?: Maybe<Scalars['DateTime']>;
  isActive: Scalars['Boolean'];
  isBanned: Scalars['Boolean'];
};

export type ViewerFragment = { __typename?: 'User'; id: string; createdAt: any; updatedAt: any };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: {
    __typename?: 'Auth';
    accessToken: string;
    user: { __typename?: 'User'; id: string; createdAt: any; updatedAt: any };
  };
};

export type ViewerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ViewerQuery = {
  __typename?: 'Query';
  viewer?: Maybe<{ __typename?: 'User'; id: string; createdAt: any; updatedAt: any }>;
};

export const ViewerFragmentDoc = gql`
  fragment Viewer on User {
    id
    createdAt
    updatedAt
  }
`;
export const SignInDocument = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      accessToken
      user {
        ...Viewer
      }
    }
  }
  ${ViewerFragmentDoc}
`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const ViewerDocument = gql`
  query Viewer($id: ID!) {
    viewer: node(id: $id) {
      id
      ...Viewer
    }
  }
  ${ViewerFragmentDoc}
`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useViewerQuery(
  baseOptions: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
}
export function useViewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    AuthState: ['LoggedInState', 'NonLoggedInState'],
    Node: ['User'],
  },
};
export default result;
