import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import ChatWidget from './ChatWidget';
import * as DataContext from '../../data/DataContext';

vi.mock('../../data/DataContext', () => ({
  useData: vi.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('ChatWidget Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders chat interface correctly', () => {
    vi.mocked(DataContext.useData).mockReturnValue({ waitTimes: {}, capacity: 80 });
    render(<ChatWidget />);
    
    expect(screen.getByText('Nexus Assistant')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask a question or scan a ticket...')).toBeInTheDocument();
  });
});
