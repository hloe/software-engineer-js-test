import React from 'react';
import { MoveButtonsProps } from './types';
import { Direction } from './types';
import { moveMapper } from './constants';

export const MoveButtons = ({ onMove }: MoveButtonsProps) => {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonId = event.currentTarget.id as Direction;
    await onMove(moveMapper[buttonId]);

  };

  return (
    <>
      <button id="left" onClick={handleClick}>Left</button>
      <button id="right" onClick={handleClick}>Right</button>
      <button id="up" onClick={handleClick}>Top</button>
      <button id="down" onClick={handleClick}>Down</button>
    </>
  );
};
