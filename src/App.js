import React from 'react'
import CanvasComp from './components/Canvas/Canvas'
import UI from './components/UI/UI'
import { state } from './components/UI/state'
import { getGPUTier } from 'detect-gpu';

// Search Imports
import { history } from 'instantsearch.js/es/lib/routers';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import algoliasearch from "algoliasearch"


//App 
function App() {
  const startTime = performance.now();
  // GPU
  (async () => {
    const gpuTier = await getGPUTier();
    // if (state.cached) {

    // } else {
    if (gpuTier.tier >= 3 || gpuTier.isMobile === true) {
      //TODO: change to false for live build
      state.canvasPaused = false;
    }
    console.log(gpuTier);
    // }
  })();

  // Search
  const searchClient = algoliasearch('QYRMFVSZ3U', 'a5bc9e2f6d2b720f636a828233179a8f');
  const indexName = 'projects';
  const routing = {
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

  const duration = performance.now() - startTime;
  console.log(`App took ${duration}ms`);
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="projects"
      routing={routing}>
      <UI />
      <CanvasComp />
    </InstantSearch>
  );
}

export default App;