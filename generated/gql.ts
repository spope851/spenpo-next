/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n      query getBlogIds {\n        allPosts {\n          posts {\n            ID\n          }\n        }\n      }\n    ": types.GetBlogIdsDocument,
    "\n        query getPost($id: String!) {\n          post(id: $id) {\n            title\n            content\n            date\n            excerpt\n            tags {\n              ID\n              slug\n              name\n              post_count\n            }\n          }\n        }\n      ": types.GetPostDocument,
    "\n      query getBlogPosts {\n        allPosts {\n          found\n          posts {\n            ID\n            content\n            title\n            date\n            excerpt\n            tags {\n              name\n              ID\n              slug\n              post_count\n            }\n          }\n        }\n      }\n    ": types.GetBlogPostsDocument,
    "\n      query getAllTags {\n        allTags {\n          tags {\n            slug\n          }\n        }\n      }\n    ": types.GetAllTagsDocument,
    "\n      query getBlogPostsWithTag($tag: String) {\n        allPosts(tag: $tag) {\n          found\n          posts {\n            ID\n            content\n            title\n            date\n            excerpt\n            tags {\n              name\n              ID\n              slug\n              post_count\n            }\n          }\n        }\n      }\n    ": types.GetBlogPostsWithTagDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query getBlogIds {\n        allPosts {\n          posts {\n            ID\n          }\n        }\n      }\n    "): (typeof documents)["\n      query getBlogIds {\n        allPosts {\n          posts {\n            ID\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query getPost($id: String!) {\n          post(id: $id) {\n            title\n            content\n            date\n            excerpt\n            tags {\n              ID\n              slug\n              name\n              post_count\n            }\n          }\n        }\n      "): (typeof documents)["\n        query getPost($id: String!) {\n          post(id: $id) {\n            title\n            content\n            date\n            excerpt\n            tags {\n              ID\n              slug\n              name\n              post_count\n            }\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query getBlogPosts {\n        allPosts {\n          found\n          posts {\n            ID\n            content\n            title\n            date\n            excerpt\n            tags {\n              name\n              ID\n              slug\n              post_count\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query getBlogPosts {\n        allPosts {\n          found\n          posts {\n            ID\n            content\n            title\n            date\n            excerpt\n            tags {\n              name\n              ID\n              slug\n              post_count\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query getAllTags {\n        allTags {\n          tags {\n            slug\n          }\n        }\n      }\n    "): (typeof documents)["\n      query getAllTags {\n        allTags {\n          tags {\n            slug\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query getBlogPostsWithTag($tag: String) {\n        allPosts(tag: $tag) {\n          found\n          posts {\n            ID\n            content\n            title\n            date\n            excerpt\n            tags {\n              name\n              ID\n              slug\n              post_count\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query getBlogPostsWithTag($tag: String) {\n        allPosts(tag: $tag) {\n          found\n          posts {\n            ID\n            content\n            title\n            date\n            excerpt\n            tags {\n              name\n              ID\n              slug\n              post_count\n            }\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;