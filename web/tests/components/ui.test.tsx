import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import RouteError from '@/components/ui/RouteError';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });
  it('applies variant classes', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByText('Delete').className).toContain('bg-red-600');
  });
  it('shows loading spinner', () => {
    render(<Button loading>Saving</Button>);
    expect(screen.getByText('Saving')).toBeTruthy();
  });
  it('is disabled when loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByText('Save').closest('button')?.disabled).toBe(true);
  });
});

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Content</p></Card>);
    expect(screen.getByText('Content')).toBeTruthy();
  });
  it('renders with header', () => {
    render(<Card><CardHeader><h2>Title</h2></CardHeader><CardContent>Body</CardContent></Card>);
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });
});

describe('Badge', () => {
  it('renders default variant', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeTruthy();
  });
  it('renders success variant', () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText('Active').className).toContain('green');
  });
});

describe('Modal', () => {
  it('renders when open', () => {
    render(<Modal open={true} onClose={() => {}} title="Test"><p>Modal content</p></Modal>);
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('Modal content')).toBeTruthy();
  });
  it('does not render when closed', () => {
    render(<Modal open={false} onClose={() => {}} title="Test"><p>Content</p></Modal>);
    expect(screen.queryByText('Test')).toBeNull();
  });
});

describe('Skeleton', () => {
  it('renders with animate-pulse', () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    expect((container.firstChild as HTMLElement)?.className).toContain('animate-pulse');
  });
});

describe('RouteError', () => {
  it('renders default error', () => {
    render(<RouteError />);
    expect(screen.getByText('Erreur')).toBeTruthy();
  });
  it('renders with custom title', () => {
    render(<RouteError title="Not Found" />);
    expect(screen.getByText('Not Found')).toBeTruthy();
  });
  it('renders retry button when reset provided', () => {
    const reset = vi.fn();
    render(<RouteError reset={reset} />);
    expect(screen.getByText('Réessayer')).toBeTruthy();
  });
});

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No data" />);
    expect(screen.getByText('No data')).toBeTruthy();
  });
});
