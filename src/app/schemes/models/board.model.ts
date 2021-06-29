import { DirectionEnum } from '../enums/direction.enum';
import { FieldModel } from './field.model';
import { PositionModel } from './position.model';
import { ShipModel } from './ship.model';

export interface BoardModel {
    id: string,
    size: number,
    board: [FieldModel[]],
    shipsDestroyed: number,
    ships?: [ShipModel],

    addShip(position: PositionModel, ship: ShipModel): boolean
}