import {atomFamily} from "recoil";
import {todos} from "./todos";

export const todosAtomFamily=atomFamily({
    key:"todosAtomFamily",
    default:(id) =>{
        return todos.find((x) => x.id==id)
    },

});






