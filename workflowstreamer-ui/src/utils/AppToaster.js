import { Position, Toaster } from "@blueprintjs/core";
 
// Singleton toaster instance
export default Toaster.create({
    className: "error-toaster",
    position: Position.TOP,
});