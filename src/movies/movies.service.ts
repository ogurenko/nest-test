import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entites/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    console.log(typeof id);
    
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException('Movie wuth this ID was not found');
    }
    return movie;
  }

  deleteMovie(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    // const movie = this.getOne(id)
    // this.deleteMovie(id)
    // We have no real database here
    // const movie = this.movies.find(movie => movie.id === +id)
    const movie = this.getOne(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData });
    // return ({movie, ...updateData})
  }
}
