import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import TopNav from './TopNav';
import * as DataContext from '../../data/DataContext';

vi.mock('../../data/DataContext', () => ({
  useData: vi.fn(),
}));

describe('TopNav Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly with capacity data', () => {
    vi.mocked(DataContext.useData).mockReturnValue({ capacity: 85 });
    render(<TopNav activeTab="staff" setActiveTab={() => {}} />);
    
    expect(screen.getByText('FIFA NEXUS')).toBeInTheDocument();
    expect(screen.getByText(/85% Capacity/i)).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    vi.mocked(DataContext.useData).mockReturnValue({ capacity: 85 });
    const setActiveTabMock = vi.fn();
    render(<TopNav activeTab="staff" setActiveTab={setActiveTabMock} />);
    
    const fanTabButton = screen.getByRole('button', { name: /Switch to Fan Portal/i });
    fireEvent.click(fanTabButton);
    
    expect(setActiveTabMock).toHaveBeenCalledWith('fan');
  });
});
