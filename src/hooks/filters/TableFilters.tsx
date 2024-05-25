import { useState, useEffect } from 'react';

/**
 * Filtra de un onchange de un input la informacion que se envie 
 * 
 * @param data Array
 * @param filterKey String
 * @returns 
 */

const useTableFilter = (data: Object[], filterKeys: String[] ) => {

  const [search, setSearch] = useState('');
  const [resultData, setResultData] = useState(data);

  useEffect(() => {

    const text_search = search.toLowerCase();

    setResultData(
      data.filter(item =>
        filterKeys.some(key =>
          item[key].toString().toLowerCase().includes(text_search)
        )
      )
    );
  }, [search, data, filterKeys]);

  return { search, setSearch, resultData };
};

export default useTableFilter;


