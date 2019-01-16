import { Position, Toaster } from "@blueprintjs/core";
 
// Singleton toaster instance
export default Toaster.create({
    className: "app-toaster",
    position: Position.TOP,
});
