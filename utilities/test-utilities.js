/**
 * Retrieves the value for the currently focused element. Call
 * `wrapper.setProps()` first to force an update to ensure
 * that the element returned by this function is current.
*/
const getFocusedElemInputVal = () => {
  const e = document.activeElement;
  
  if (e) {
    let key = getKeyStartsWith(e, "__reactInternalInstance$");
    const inst = e[key];
    
    if (inst && inst.stateNode) {
      key = getKeyStartsWith(inst.stateNode, "__reactEventHandlers$");
      const handler = inst.stateNode[key];
      
      if (handler) {
        return handler.value;
      }
    }
  }
};

/**
 * Get the first key in an object which starts with a string `s`
*/
const getKeyStartsWith = (o, s) => 
  Object.keys(o).find(key => key.startsWith(s))
;

module.exports = {getKeyStartsWith, getFocusedElemInputVal};