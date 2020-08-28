import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Price {
  @Field()
  value!: number;

  @Field()
  currency!: string;

  @Field({nullable: true, defaultValue: false})
  approximately?: boolean;
}
