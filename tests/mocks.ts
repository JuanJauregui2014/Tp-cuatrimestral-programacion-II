import Pedido from "../src/#pedido";
import { MockProxy, mock} from "jest-mock-extended";

export const pedidoCompletoMock: MockProxy<Pedido> = mock<Pedido>();