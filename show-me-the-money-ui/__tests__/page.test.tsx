import Page from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';

describe('Page', () => {
  it('renders a component', () => {
    const component = renderer.create(
      <Page />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})