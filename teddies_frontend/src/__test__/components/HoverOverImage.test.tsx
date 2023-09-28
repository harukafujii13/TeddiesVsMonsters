import HoverOverImage from '@/components/HoverOverImage/HoverOverImage';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('HoverOverImage.tsx', () => {
  it('should render propery', () => {
    render(
      <HoverOverImage
        img='/temp/Archer BW 1.png'
        hoverImg='/temp/Archer BW 1 (1).png'
        alt='ghost'
      />,
    );

    const img = screen.getByAltText('ghost');

    expect(img).toBeTruthy();
  });
});
