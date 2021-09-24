import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './views/HomePage/HomePage';
import MoviesPage from './views/MoviesPage/MoviesPageSearch';
import MovieDetails from './views/MoviesPage/MovieDetails';
function App() {
  return (
    <div>
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
