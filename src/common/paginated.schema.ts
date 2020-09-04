import {Type} from '@nestjs/common';
import {ObjectType, Field, Int} from '@nestjs/graphql';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}PageInfo`)
  abstract class PageInfo {
    @Field((type) => Boolean)
    hasPrevPage!: boolean;

    @Field((type) => Int, {nullable: true})
    prevPage?: number;

    @Field((type) => Boolean)
    hasNextPage!: boolean;

    @Field((type) => Int, {nullable: true})
    nextPage?: number;

    @Field((type) => Int)
    page!: number;

    @Field((type) => Int)
    totalPages!: number;
  }

  @ObjectType({isAbstract: true})
  abstract class PaginatedType {
    @Field((type) => [classRef])
    docs!: T[];

    @Field((type) => Int)
    totalDocs!: number;

    @Field((type) => Int)
    limit!: number;

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }
  return PaginatedType;
}
