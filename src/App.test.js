import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders society management system', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});

test('renders sidebar navigation', () => {
  render(<App />);
  const sidebarElement = screen.getByText(/ROYCE Management/i);
  expect(sidebarElement).toBeInTheDocument();
});

test('renders summary cards', () => {
  render(<App />);
  const towerElement = screen.getByText(/Tower/i);
  const apartmentsElement = screen.getByText(/Apartments/i);
  expect(towerElement).toBeInTheDocument();
  expect(apartmentsElement).toBeInTheDocument();
});
