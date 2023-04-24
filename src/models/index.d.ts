import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTodos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todos = LazyLoading extends LazyLoadingDisabled ? EagerTodos : LazyTodos

export declare const Todos: (new (init: ModelInit<Todos>) => Todos) & {
  copyOf(source: Todos, mutator: (draft: MutableModel<Todos>) => MutableModel<Todos> | void): Todos;
}