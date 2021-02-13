import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Movie[] {
    return this.moviesService.getMovies();
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `All the movies made after ${year}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    // console.log(typeof id);
    
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    // console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id);
  }

  @Patch('/:id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    // return {
    //     updatedMovie: id,
    //     ...updateData
    // }
    return this.moviesService.update(id, updateData);
  }
}
