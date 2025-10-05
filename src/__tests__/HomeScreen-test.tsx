import { act } from '@testing-library/react-native';
import { Home } from '../features/home/HomeScreen';
import { render } from './test-utils';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('../store/productStore.ts', () => ({
  useProductStore: jest.fn(),
}));

describe('<Home />', () => {
  beforeEach(() => {
    const mockUseProductStore =
      require('../store/productStore.ts').useProductStore;
    mockUseProductStore.mockImplementation((selector: any) => {
      const state = {
        products: [],
        fetchProducts: jest.fn().mockResolvedValue(undefined),
        isFetching: false,
      };
      return selector ? selector(state) : state;
    });
  });

  test('FlatList renders correctly', async () => {
    const { getByTestId } = render(<Home />, {});

    await act(async () => {});

    expect(getByTestId('products-flatlist')).toBeTruthy();
  });
});
