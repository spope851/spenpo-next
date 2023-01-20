/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  ID: Scalars['ID'];
  URL: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['String'];
  excerpt: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
};

export type Posts = {
  __typename?: 'Posts';
  found: Scalars['Int'];
  posts: Array<BlogPost>;
};

export type Query = {
  __typename?: 'Query';
  allPosts: Posts;
  post: BlogPost;
};


export type QueryAllPostsArgs = {
  tag?: InputMaybe<Scalars['String']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  ID: Scalars['ID'];
  name: Scalars['String'];
  post_count?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
};

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', post: { __typename?: 'BlogPost', title: string, content: string, date: string, tags: Array<{ __typename?: 'Tag', ID: string, slug: string, name: string, post_count?: number | null }> } };

export type GetBlogPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogPostsQuery = { __typename?: 'Query', allPosts: { __typename?: 'Posts', found: number, posts: Array<{ __typename?: 'BlogPost', ID: string, content: string, title: string, date: string, excerpt: string, tags: Array<{ __typename?: 'Tag', name: string, ID: string, slug: string, post_count?: number | null }> }> } };

export type GetBlogPostsWithTagQueryVariables = Exact<{
  tag?: InputMaybe<Scalars['String']>;
}>;


export type GetBlogPostsWithTagQuery = { __typename?: 'Query', allPosts: { __typename?: 'Posts', found: number, posts: Array<{ __typename?: 'BlogPost', ID: string, content: string, title: string, date: string, excerpt: string, tags: Array<{ __typename?: 'Tag', name: string, ID: string, slug: string, post_count?: number | null }> }> } };


export const GetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"post_count"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>;
export const GetBlogPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBlogPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"found"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"post_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBlogPostsQuery, GetBlogPostsQueryVariables>;
export const GetBlogPostsWithTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBlogPostsWithTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"found"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"post_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBlogPostsWithTagQuery, GetBlogPostsWithTagQueryVariables>;