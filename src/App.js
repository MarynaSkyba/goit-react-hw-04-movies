import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import styles from './components/MoviesPage/MoviePageDetails.module.css';

const Navigation = lazy(() =>
  import('./components/Navigation/Navigation' /* webpackChunkName: "Navigation"  */),
);
const HomePage = lazy(() => import('./views/HomePage' /* webpackChunkName: "home-page"  */));
const SearchBar = lazy(() => import('./views/SearchBar' /* webpackChunkName: "search-bar"  */));
const MovieDetails = lazy(() =>
  import('./views/MovieDetails' /* webpackChunkName: "movie-details"  */),
);

const NotFoundViews = lazy(() =>
  import('./views/NotFoundViews' /* webpackChunkName: "NotFoundViews"  */),
);

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <Loader
            type="Hearts"
            color="#a52a62"
            height={200}
            width={200}
            timeout={3000}
            display="flex"
            justify-content="center"
            className={styles.loader}
          />
        }
      >
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetails />
          </Route>

          <Route path="/movies">
            <SearchBar />
          </Route>
          <Route>
            <NotFoundViews />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
