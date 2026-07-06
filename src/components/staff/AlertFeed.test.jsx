import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import AlertFeed from './AlertFeed';
import * as DataContext from '../../data/DataContext';

vi.mock('../../data/DataContext', () => ({
  useData: vi.fn(),
}));

describe('AlertFeed Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders alerts with reasoning trace', () => {
    const mockAlerts = [
      { id: 1, type: 'warning', text: 'Crowd build-up detected', reasoningTrace: 'Agent Predictor: Zone 3 is 90%', time: '12:00 PM' }
    ];
    vi.mocked(DataContext.useData).mockReturnValue({ alerts: mockAlerts });
    render(<AlertFeed />);
    
    expect(screen.getByText('GenAI Live Alerts')).toBeInTheDocument();
    expect(screen.getByText('Crowd build-up detected')).toBeInTheDocument();
    expect(screen.getByText('View Agent Reasoning')).toBeInTheDocument();
    expect(screen.getByText('Agent Predictor: Zone 3 is 90%')).toBeInTheDocument();
  });
});
