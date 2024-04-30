import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/inputs/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [Todo], { name: 'todos' })
  finAdll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.create(createTodoInput);
  }
  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Todo {
    return this.todoService.update(updateTodoInput);
  }
  @Mutation(() => Boolean, { name: 'removeTodo' })
  removeTodo(@Args('id', { type: () => Int }) id: number): Boolean {
    return this.todoService.remove(id);
  }

  @Query(() => Int, { name: 'totalTodos' })
  totalTodos() {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos() {
    return this.todoService.pendingTodos;
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedTodos() {
    return this.todoService.completedTodos;
  }

  @Query(() => AggregationsType)
  aggregation(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
    };
  }
}
