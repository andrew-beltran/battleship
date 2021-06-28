import { Component, OnInit } from '@angular/core';
import { BoardElementComponent } from './components/board-element/board-element.component';
import { DirectionEnum } from './schemes/enums/direction.enum';
import { BoardModel } from './schemes/models/board.model';
import { FieldModel } from './schemes/models/field.model';
import { PositionModel } from './schemes/models/position.model';
import { ShipModel } from './schemes/models/ship.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'battleship';
  boardSize = 10;
  shipSelected: number;

  ships: ShipModel[] = [
    {
      direction: DirectionEnum['bottom'],
      size: 5,
    },
    {
      direction: DirectionEnum['bottom'],
      size: 4,
    },
    {
      direction: DirectionEnum['bottom'],
      size: 3,
    },
    {
      direction: DirectionEnum['bottom'],
      size: 3,
    },
    {
      direction: DirectionEnum['bottom'],
      size: 2,
    },
  ]
  
  

  playerBoard: BoardModel = {
    id: 'player',
    size: this.boardSize,
    board: [[]],

    addShip: (position: PositionModel, ship: ShipModel) => {

      if (this.addShipOnBoard(this.playerBoard, position, ship)) {
        !this.playerBoard.ships ? this.playerBoard.ships = [ship] : this.playerBoard.ships.push(ship);
        return true;
      }
      return false;
    }
  }

  machineBoard: BoardModel = {
    
    id: 'machine',
    size: this.boardSize,
    board: [[]],

    addShip: (position: PositionModel, ship: ShipModel) => {

      if (this.addShipOnBoard(this.machineBoard, position, ship)) {
        !this.machineBoard.ships ? this.machineBoard.ships = [ship] : this.machineBoard.ships.push(ship);
        return true;
      }

      return false;
    }
  }

  constructor() { }

  ngOnInit() {
    this.initBoard(this.playerBoard);
    this.initBoard(this.machineBoard);
    
    for (let i = 0; i < this.ships.length; i++) {
      this.addShipOnRamdomPosition(this.machineBoard, this.ships[i]);
    }
    this.shipSelected = 0;
    console.log(this.machineBoard.ships);
  }

  initBoard(board: BoardModel) {
    for (let x = 0; x < this.boardSize; x++) {
      board.board.push([])
      for (let y = 0; y < this.boardSize; y++) {
        let field: FieldModel = {
          id: 'field-' + x + '_' + y,
          position: {
            x: x,
            y: y
          },
          ship: false,
          discovered: false,

          setShip: () => field.ship = true,
          setDiscovered: () => field.discovered = true,
        }
        board.board[x].push(field);
      }
    }
    board.board.pop(); // TODO BUG cuando se añaden las filas al principio se añade 1 de mas por que el tablero inicialmente no puede estar vacío.
  }

  addShipOnBoard(board: BoardModel, position: PositionModel, ship: ShipModel): boolean{

    if (ship.direction == DirectionEnum['bottom'] && position.x + ship.size > this.boardSize
    || ship.direction == DirectionEnum['left'] && position.y + ship.size > this.boardSize) {
      console.log('out of range, pos.x: ' + position.x + '   pos.y: ' + position.y + '   shipDir: ' + ship.direction);
      return false;
    } else {
      for (
        let i = 0, x = position.x, y = position.y; 
        i < ship.size; 
        i++, ship.direction == DirectionEnum['bottom'] ? x++ : y++
        ) {
        if (board.board[x][y].ship) {
          console.log('Other ship block this site');
          return false;
        }
      }
    }
    for (
      let i = 0, x = position.x, y = position.y; 
      i < ship.size; 
      i++, ship.direction == DirectionEnum['bottom'] ? x++ : y++
      ) {
      board.board[x][y].setShip();
    }
    this.shipSelected = -1;
    return true;
  }

  addShipOnRamdomPosition(board: BoardModel, ship: ShipModel) {
    let position: PositionModel

    do {
      position = {
        x:  Math.floor(Math.random() * 10),
        y:  Math.floor(Math.random() * 10),
      }
      ship.direction = Math.random() > 0.5 ? DirectionEnum['left'] : DirectionEnum['bottom'];
    } while (!board.addShip(position, ship))
    ship.direction = DirectionEnum['bottom'];
  }

  onHandlePlayerField(field: FieldModel) {
    if (this.shipSelected >= 0) {
      this.playerBoard.addShip(field.position, this.ships[this.shipSelected]);
    }
  }
  onHandleMachineField(field: FieldModel) {
    if (this.playerBoard.ships?.length == this.ships.length && !field.discovered) {
      field.setDiscovered();

      let position: PositionModel;
      do {
        position = {
          x:  Math.floor(Math.random() * 10),
          y:  Math.floor(Math.random() * 10),
        }
      } while (this.playerBoard.board[position.x][position.y].discovered);
      this.playerBoard.board[position.x][position.y].setDiscovered();
    }
  }

  changeDirectionShip(ship: number) {
    this.ships[ship].direction = this.ships[ship].direction == DirectionEnum['bottom'] ? DirectionEnum['left'] : DirectionEnum['bottom'];
  }
  onSelectShip(ship) {
    this.shipSelected = ship;
  }
}
