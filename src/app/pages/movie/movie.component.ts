import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from '../../constants/image-sizes';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
    movie: Movie | null = null;
    movieVideos: MovieVideo[] = [];
    movieImages: MovieImages | null = null;
    movieCredits: MovieCredits | null = null;
    imagesSizes = IMAGES_SIZES;

    constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

    ngOnInit(): void {
        this.route.params.pipe(first()).subscribe(({ id }) => {
            this.getMovie(id);
            this.getMovieVideos(id);
            this.getMovieImages(id);
            this.getMovieCredits(id);
        });
    }

    ngOnDestroy(): void {
        console.log('destroyed');
    }

    getMovie(id: string) {
        this.moviesService.getMovie(id).subscribe((movieData) => {
            this.movie = movieData;
        });
    }

    getMovieVideos(id: string) {
        this.moviesService.getMovieVideos(id).subscribe((movieVideosData) => {
            this.movieVideos = movieVideosData;
        });
    }

    getMovieImages(id: string) {
        this.moviesService.getMovieImages(id).subscribe((movieImagesData) => {
            this.movieImages = movieImagesData;
        });
    }

    getMovieCredits(id: string) {
        this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
            this.movieCredits = movieCreditsData;
        });
    }
}
