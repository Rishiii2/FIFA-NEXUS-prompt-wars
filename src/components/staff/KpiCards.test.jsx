import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import KpiCards from './KpiCards';
import * as DataContext from '../../data/DataContext';

vi.mock('../../data/DataContext', () => ({
  useData: vi.fn(),
}));

describe('KpiCards Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders wait times correctly', () => {
    vi.mocked(DataContext.useData).mockReturnValue({ waitTimes: { food: 15, restroom: 5, merch: 10 }, capacity: 80 });
    render(<KpiCards />);
    
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('Avg Wait (Food)')).toBeInTheDocument();
    expect(screen.getByText('5 min')).toBeInTheDocument();
    expect(screen.getByText('Avg Wait (Restroom)')).toBeInTheDocument();
  });
});
