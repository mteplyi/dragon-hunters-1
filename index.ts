type User = {
  id: string;
  name: string;
  posts: Post[];

  /**
   * For testing
   */
  postIds: string[];
  postMatrix: Post[][];
  postMatrixIds: string[][];
}

type Post = {
  id: string;
  text: string;
  user: User;
}

type Entity = User | Post

/**
 * Supports only one-dimensional arrays of nested entities
 */
// type Select<TEntity> = {
//   [TProperty in keyof TEntity]?:
//   TEntity[TProperty] extends (Entity & infer TNestedEntity) | (Array<Entity & infer TNestedEntity>)
//     ? Select<TNestedEntity>
//     : boolean
// }

/**
 * Supports multi-dimensional arrays of nested entities
 */
type Select<TEntity> = {
  [TProperty in keyof TEntity]?: SelectPropertyValue<TEntity[TProperty]>
}

type SelectPropertyValue<TValue> =
  TValue extends Entity
    ? Select<TValue>
    : TValue extends Array<infer TArrayItem>
      ? SelectPropertyValue<TArrayItem>
      : boolean

const userSelect: Select<User> = {
  id: true,
  name: true,
  posts: {
    id: true,
    text: true,
    user: {
      id: true,
    },
  },

  /**
   * For testing
   */
  // postIds: true,
  // postMatrix: {
  //   id: true,
  //   text: true,
  //   user: {
  //     id: true,
  //     postIds: true,
  //   },
  // },
  // postMatrixIds: true,
};

const postSelect: Select<Post> = {
  id: true,
  text: true,
  user: {
    id: true,
    name: true,
  },
};
