import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Navigation = lazy(() =>
  import('./components/Navigation/Navigation' /* webpackChunkName: "Navigation"  */),
);
const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-page"  */),
);
const SearchBar = lazy(() =>
  import('./views/MoviesPage/SearchBar' /* webpackChunkName: "search-bar"  */),
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
            <SearchBar />
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
