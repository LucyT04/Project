import React from 'react';
import './WordSearchGrid.css';

export const WordSearchGrid = ({ grid, onCellClick, selectedCells, foundCells }) => {
  return (
    <div className="word-search-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${
                foundCells.some(
                  (foundCell) =>
                    foundCell.row === rowIndex && foundCell.col === colIndex
                )
                  ? 'found'
                  : ''
              } ${
                selectedCells.some(
                  (selectedCell) =>
                    selectedCell.row === rowIndex && selectedCell.col === colIndex
                )
                  ? 'selected'
                  : ''
              }`}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {grid[rowIndex][colIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};