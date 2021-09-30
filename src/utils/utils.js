export const sortList = list => {
  return list.sort((a, b)=> {

    let currentItem = a.name.toUpperCase(),
    nextItem = b.name.toUpperCase();
    
    return currentItem === nextItem ? 0 : currentItem > nextItem ? 1 : -1;
  })
}

export const updateObject = (oldObject, updatedProperties) => {
  const objectToBeUpdated = {
    ...oldObject,
    ...updatedProperties
  };
  return objectToBeUpdated;
}