import { Pizza } from '../../models/pizza.model';
import * as fromActions from '../actions/pizzas.action';
import * as fromPizzas from './pizzas.reducer';

describe('PizzasReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPizzas;
      const action = {} as any;
      const state = fromPizzas.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PIZZAS action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzas();
      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe('LOAD_PIZZAS_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];

      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      };

      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzasSuccess(pizzas);
      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });

  describe('LOAD_PIZZAS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromPizzas;
      const action = new fromActions.LoadPizzasFail({});
      const state = fromPizzas.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = fromPizzas;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadPizzasFail({});
      const state = fromPizzas.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE_PIZZA_SUCCESS action', () => {
    it('should add the new pizza to pizzas array', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];

      const entities = { 1: pizzas[0], 2: pizzas[1] };

      const newPizza: Pizza = { id: 3, name: 'Pizza #3', toppings: [] };

      const { initialState } = fromPizzas;
      const previousState = { ...initialState, entities };
      const action = new fromActions.CreatePizzaSuccess(newPizza);
      const state = fromPizzas.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({ ...entities, 3: newPizza });
    });
  });

  describe('UPDATE_PIZZA_SUCCESS action', () => {
    it('should update the pizza', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];

      const entities = { 1: pizzas[0], 2: pizzas[1] };

      const updatedPizza: Pizza = {
        id: 2,
        name: 'Pizza #2',
        toppings: [{ id: 1, name: 'basil' }]
      };

      const { initialState } = fromPizzas;
      const previousState = { ...initialState, entities };
      const action = new fromActions.UpdatePizzaSuccess(updatedPizza);
      const state = fromPizzas.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({ ...entities, 2: updatedPizza });
    });
  });

  describe('REMOVE_PIZZA_SUCCESS action', () => {
    it('should remove the pizza', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];

      const entities = { 1: pizzas[0], 2: pizzas[1] };

      const { initialState } = fromPizzas;
      const previousState = { ...initialState, entities };
      const action = new fromActions.RemovePizzaSuccess(pizzas[0]);
      const state = fromPizzas.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({ 2: pizzas[1] });
    });
  });
});

describe('PizzasReducer Selectors', () => {
  describe('getPizzasEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: number]: Pizza } = {
        1: { id: 1, name: 'Pizza #1', toppings: [] },
        2: { id: 2, name: 'Pizza #2', toppings: [] }
      };

      const { initialState } = fromPizzas;
      const previousState = { ...initialState, entities };
      const slice = fromPizzas.getPizzasEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe('getPizzasLoading', () => {
    it('should return .loading', () => {
      const { initialState } = fromPizzas;
      const previousState = { ...initialState, loading: true };
      const slice = fromPizzas.getPizzasLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getPizzasLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromPizzas;
      const previousState = { ...initialState, loaded: true };
      const slice = fromPizzas.getPizzasLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });
});
