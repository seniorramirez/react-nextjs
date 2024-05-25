
/**
 * Funcion para poder filtrar de un array de objetos
 * 
 * @param data Array
 * @param search String
 * @param filterKeys Array
 * @returns 
 */
const tableFilter = (data: any, search: String, filterKeys: String[] ) => {

    const text_search = search.toLowerCase();

    
    let result = data.filter(item =>
        filterKeys.some(key =>
          item[key].toString().toLowerCase().includes(text_search)
        )
    )

  return result;
};

export default tableFilter;