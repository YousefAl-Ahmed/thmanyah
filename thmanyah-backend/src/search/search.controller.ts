import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dtos/search.query.dto';
import type { SearchResponse } from './types';

@Controller('api')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('search')
  search(@Query() q: SearchQueryDto): Promise<SearchResponse> {
    const term = q.term?.trim();
    if (!term) {
      throw new BadRequestException('The "term" query parameter is required.');
    }
    return this.service.search(term, q.limit, q.offset);
  }
}
