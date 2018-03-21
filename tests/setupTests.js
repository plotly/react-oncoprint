/* global window */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// This is needed to mock the canvas as it is not mocked by JSDOM.
import 'jest-canvas-mock';

Enzyme.configure({ adapter: new Adapter() });

// This is also needed because `mapbox-gl-js` requires it, see:
// https://github.com/mapbox/mapbox-gl-js/issues/3436
window.URL.createObjectURL = jest.fn();
