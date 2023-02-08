import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import type { AppStore, RootState } from '../services/store/index';
import { ExerciseSearchSlice } from '../services/store/exerciseSearchSlice'
import { ExerciseDetailsSlice } from '../services/store/exercisesSlice'
import { BrowserRouter } from 'react-router-dom'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      exerciseDetails: {
        loading: false,
        errorMessage: '',
        currentExercise: null,
        exerciseVideos: [],
        sameType: [],
        sameMuscle: [],
      },
      exercisesSearch: {
        searchTerm: '',
        loading: false,
        errorMessage: '',
        searchResults: null,
      }
    },
    store = configureStore({
      reducer: {
        exerciseDetails : ExerciseDetailsSlice.reducer,
        exercisesSearch : ExerciseSearchSlice.reducer,
      }, preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}