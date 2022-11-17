import algoliasearch from "algoliasearch";
import { history } from "instantsearch.js/es/lib/routers";

// Todo: regenerate
export const searchClient = algoliasearch(
  "QYRMFVSZ3U",
  process.env.REACT_APP_AlgoliaKey
);

//ALGOLIA SEARCH
const indexName = "projects";
export const routing = {
  router: history(),
  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState[indexName];
      return {
        query: indexUiState.query,
        // categories: indexUiState.menu?.categories,
        // brand: indexUiState.refinementList?.refinementList.brand,
        // page: indexUiState.page,
      };
    },
    routeToState(routeState) {
      return {
        [indexName]: {
          query: routeState.query,
          // menu: {
          //   categories: routeState.categories,
          // },
          // refinementList: {
          //   brand: routeState.brand,
          // },
          // page: routeState.page,
        },
      };
    },
  },
};
