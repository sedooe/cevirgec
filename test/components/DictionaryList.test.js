import React from 'react';
import DictionaryList from '../../app/components/DictionaryList';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import { mount } from 'enzyme';
import { expect as hope } from 'chai';

function empty(){}

let dictionaries = {
  "1": {
    id: "1",
    name: "deneme",
    sourceLanguage: "af",
    targetLanguage: "tr",
    context: "sport",
    numberOfDefinitions: "9",
    active: true
  },
  "2": {
    id: "2",
    name: "sozluk",
    sourceLanguage: "za",
    targetLanguage: "tr",
    context: "technology",
    numberOfDefinitions: "90",
    active: false
  }
};

describe('DictionaryList Component', function () {

  describe('DictionaryList renders correctly [snapshots]', function () {
    it('renders correctly with data', () => {
      const component = renderer.create(
        <DictionaryList
          dictionaries={dictionaries}
          onEdit={empty}
          onDelete={empty}
          onCheckboxToggle={empty} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('shows empty message with no data', () => {
      const component = renderer.create(
        <DictionaryList
          dictionaries={ {} }
          onEdit={empty}
          onDelete={empty}
          onCheckboxToggle={empty} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('DictionaryList renders list item\'s DOM elements correctly', function () {
    it('shows empty message with no data [DOM check]', () => {
      const component = shallow(
        <DictionaryList
          dictionaries={ {} }
          onEdit={empty}
          onDelete={empty}
          onCheckboxToggle={empty} />
      );

      // Keep below as example
      hope(component.find('.info')).to.have.length(1);
      // or
      expect(component.find('.info').length).toEqual(1);
    });

    it('should show properties of listed dictionaries', () => {
      // Render a checkbox with label in the document
      const component = mount(
        <DictionaryList
          dictionaries={dictionaries}
          onEdit={empty}
          onDelete={empty}
          onCheckboxToggle={empty} />
      );

      expect(component.find('.item .header').first().text()).toEqual('deneme');

      expect(component.find('[type="checkbox"]').first().prop('checked')).toEqual(true);
      expect(component.find('[type="checkbox"]').at(1).prop('checked')).toEqual(false);
    });

    // FIXME this doesn't work
    // https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/modules/Checkbox/Checkbox.js#L148
    it.skip('that checkbox changes state after click', () => {

      const component = mount(
        <DictionaryList
          dictionaries={dictionaries}
          onEdit={empty}
          onDelete={empty}
          onCheckboxToggle={empty} />
      );

      //don't know why this doesn't work :(

      console.log(component.find('[type="checkbox"]').first().prop('checked'));
      expect(component.find('[type="checkbox"]').first().prop('checked')).toEqual(true);
      component.find('[type="checkbox"]').first().simulate('click', {});
      console.log(component.find('[type="checkbox"]').first().prop('checked'));
      expect(component.find('[type="checkbox"]').first().prop('checked')).toEqual(false);
    });

  });
});
