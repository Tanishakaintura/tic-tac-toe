
  window.addEventListener('DOMContentLoaded', () =>  {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentplayer = 'X';
    let isgameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winingconditions = [
      [0,1,2],
      [0,3,6],
      [3,4,5], 
      [6,7,8],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
      ];

      function handleresultvalidation() {
        let roundWon = false;
        for(let i = 0; i<=7; i++) {
          const winCondition = winingconditions[i];
        const a= board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a==='' || b==='' || c==='') {
          continue;
        }
        if (a === b && b===c ) {
          roundWon = true;
          break;
        }
      }
      if (roundWon){
        announce(currentplayer === 'X' ? PLAYERX_WON:PLAYERO_WON);
        isgameActive = false;
        return;
      }   
      if(!board.includes(''))
      announce(TIE);
      }

      const announce = (type) => {
        switch(type) {
          case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class = "playerO">O </span> Won';
            break;
            case PLAYERX_WON:
              announcer.innerHTML = 'Player <span class = "playerX">X </span> Won';
              break;
              case TIE:
                announcer.innerText= 'Tie';
        }
        announcer.classList.remove('hide');
      }; 
      
      const isvalidaction = (tile) => {
        if( tile.innerText === 'X' || tile.innerText=== 'O'){
          return false;
        }
        return true;
      };

      const updateboard = (index) => {
        board[index] = currentplayer;
      }

     const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentplayer}`);
      currentplayer = currentplayer==='X' ? 'O' : 'X';
      playerDisplay.innerText = currentplayer;
      playerDisplay.classList.add(`player${currentplayer}`);
     }
      const userAction = (tile, index) => {
        if(isvalidaction(tile) && isgameActive) {
          tile.innerText = currentplayer;
          tile.classList.add(`player${currentplayer}`);
          updateboard(index);
          handleresultvalidation();
          changePlayer();
        }
      }
const resetBoard = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  isgameActive = true;
  announcer.classList.add('hide');

  if(currentplayer === 'O') {
    changePlayer();
  }
  tiles.forEach(tile => {
    tile.innerText = '';
    tile.classList.remove('playerX');
    tile.classList.remove('playerO');

  });
}

      tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
      });
    resetButton.addEventListener('click', resetBoard);
    });