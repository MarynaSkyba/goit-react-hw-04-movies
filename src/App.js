import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation';
// import HomePage from './views/HomePage/HomePage';
// import MoviesPage from './views/MoviesPage/MoviesPageSearch';
// import MovieDetails from './views/MoviesPage/MovieDetails';

const Navigation = lazy(() =>
  import('./components/Navigation/Navigation' /* webpackChunkName: "Navigation"  */),
);
const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-page"  */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage/MoviesPageSearch' /* webpackChunkName: "movies-page"  */),
);
const MovieDetails = lazy(() =>
  import('./views/MoviesPage/MovieDetails' /* webpackChunkName: "movie-details"  */),
);

function App() {
  return (
    <div>
      <Suspense fallback={<div>Download</div>}>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;

// В приложении должны быть следующие маршруты. Если пользователь зашел по несуществующему маршруту, его необходимо перенаправлять на домашнюю страницу.

// '/' - компонент <HomePage>, домашняя страница со списком популярных кинофильмов.
// '/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.
// '/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.
// /movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.
// /movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.
