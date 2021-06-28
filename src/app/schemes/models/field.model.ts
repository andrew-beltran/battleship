import { PositionModel } from "./position.model";

export interface FieldModel {
    id: string,
    position: PositionModel,
    ship: boolean,
    discovered: boolean,

    setShip(),
    setDiscovered()

}