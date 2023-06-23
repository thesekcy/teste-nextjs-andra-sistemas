export const formatDeleteObject = (ids: number[]) => {
  let deleteList: {
    lista: { idLista: number, id: number }[];
  } = {
    "lista": []
  };

  let updatedList = ids.map(id => ({
    "idLista": 1,
    "id": id
  }));

  deleteList.lista = [...deleteList.lista, ...updatedList];

  return deleteList
}