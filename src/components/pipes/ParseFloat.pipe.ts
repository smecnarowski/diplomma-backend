import { PipeTransform, Optional, Injectable, HttpStatus, ArgumentMetadata, BadRequestException } from "@nestjs/common";

export interface ParseFloatPipeOptions {
  errorHttpStatusCode?: HttpStatus.BAD_REQUEST
  exceptionFactory?: (error: string) => any;
}

/**
 * Defines the built-in ParseFloat Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
@Injectable()
export class ParseFloatPipe implements PipeTransform<string> {
  protected exceptionFactory: (error: string) => any;

  constructor(@Optional() options?: ParseFloatPipeOptions) {
    options = options || {};
    const {
      exceptionFactory,
      errorHttpStatusCode = HttpStatus.BAD_REQUEST,
    } = options;

    this.exceptionFactory =
      exceptionFactory ||
      (error => new BadRequestException(error));
  }

  /**
   * Method that accesses and performs optional transformation on argument for
   * in-flight requests.
   *
   * @param value currently processed route argument
   * @param metadata contains metadata about the currently processed route argument
   */
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const isNumeric =
      ['string', 'number'].includes(typeof value) &&
      !isNaN(parseFloat(value)) &&
      isFinite(value as any);
    if (!isNumeric) {
      throw this.exceptionFactory(
        `Validation failed for ${metadata.data} (numeric string is expected)`,
      );
    }
    return parseFloat(value);
  }
}