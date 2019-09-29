import React from 'react';
import AddCar from './Components/AddCar';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { isTSAnyKeyword } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddCar />', () => {
    it('renders five <TextInput /> components', () => {
        const wrapper = shallow(<AddCar />);
        expect(wrapper.find('TextField')).toHaveLength(5);
    });
});

describe('<AddCar />', () => {
    it('test onChange', () => {
        const wrapper = shallow(<AddCar />);
        const brandInput = wrapper.find('TextField').get(0);
        brandInput.instance().value = 'Ford';
        usernameInput.simulate('change');
        expect(wrapper.state('brand')).toEqual('Ford');
    });
});