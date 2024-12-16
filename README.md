# Memory Game

This project is a modular and interactive memory game built with JavaScript, HTML, and CSS. The game consists of a grid of cards, and the goal is to match pairs of cards by flipping them over. Once all the pairs are matched, a completion screen is displayed.

## Features

- **Dynamic Grid Sizes**: Players can choose the size of the grid (e.g., 2x2, 4x4, 6x6, 8x8).
- **Modular Design**: The project is organized into classes for scalability and maintainability.
  - `Board`: Responsible for creating and managing the game board.
  - `MemoryGame`: Manages the game logic, such as flipping cards, checking for matches, and tracking progress.
- **Completion Overlay**: A completion image is displayed when all cards are matched.
- **Responsive Design**: The game is designed to work across various screen sizes. It works better in bigger screens at the moment.

## How It Works

### Classes

1. **Board**
   - Generates a grid of cards based on the selected size.
   - Randomly assigns pairs of images to cards.
   - Ensures the board layout is properly styled.

2. **MemoryGame**
   - Handles game logic, including:
     - Flipping cards.
     - Checking for matches.
     - Resetting unmatched cards.
   - Tracks progress and detects when the game is complete.
   - Displays a completion overlay when all pairs are found.

### User Interaction

1. The user selects a grid size (e.g., 4x4).
2. The game board is dynamically generated with shuffled cards.
3. The user clicks on cards to flip them and find matching pairs.
4. The game ends when all pairs are matched, and a completion screen is displayed.

## Technologies Used

- **HTML5**: For the game’s structure.
- **CSS3 and Bootstrap**: For styling the game board and cards.
- **JavaScript (ES6)**: For game logic and interactivity.

## Future Improvements

- Make sure the card divs are always square
- Make game div fit screen


## Acknowledgments

- Images used for the cards are my own creation and should be replaced with appropriate assets if published.
- Stellar glyphs are mostly from [Raven Grimassi's Hereditary Witchcraft: Secrets of the Old Religion](https://amzn.to/3ZTstg9).

---

Enjoy playing the Memory Game and feel free to contribute or provide feedback!

