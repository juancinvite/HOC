import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoginPage from '../LoginPage';

describe('LoginPage', () => {
  test('renders login form', () => {
    render(
      <MemoryRouter>
        <LoginPage onLogin={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Go al Register/i)).toBeInTheDocument();
  });

  test('login with valid credentials', () => {
    const history = createMemoryHistory();
    const onLogin = jest.fn();

    const users = [{ username: 'testuser', password: 'password' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(
      <Router location={history.location} navigator={history}>
        <LoginPage onLogin={onLogin} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Login/i));

    expect(onLogin).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/protected');
  });

  test('shows alert on invalid credentials', () => {
    const onLogin = jest.fn();
    window.alert = jest.fn(); // Mock alert

    render(
      <MemoryRouter>
        <LoginPage onLogin={onLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'invalidpassword' } });
    fireEvent.click(screen.getByText(/Login/i));

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    expect(onLogin).not.toHaveBeenCalled();
  });
});