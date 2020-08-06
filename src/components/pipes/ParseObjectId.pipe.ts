import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.match(/^[a-f\d]{24}$/i)) {
      return value
    }
    throw new BadRequestException('Validation failed - invalid ObjectID');
  }
}