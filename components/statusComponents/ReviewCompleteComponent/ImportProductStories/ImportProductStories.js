import { useState, useEffect, useCallback, useContext } from 'react';
import { ShopDataContext } from '../../../../assets/context';
import { addURLParams } from '../../../../graphql/APICalls';
import MutationPanel from '../../../MutationPanel';
import { createInputArray } from './utilities';
import { Stack } from '@shopify/polaris';
import { CREATE_METAFIELD_DEFINITION, SET_METAFIELDS } from '../../../../graphql/mutations';

// component fetches product data from back end and mutates shop metefields
const ImportProductStories = (props) => {
  const { setIsLoading, setIsComplete } = props;
  const [runMutation, setRunMutation] = useState(false)
  const [productData, setProductData] = useState([]);
  const [checkAllMutations, setCheckAllMutations] = useState([]);
  const shopData = useContext(ShopDataContext);
  
  // 1. fetch product data
  const fetchResponse = useCallback(async() => {
    console.log("fetch response runing")
    const myHeaders = new Headers();
    const products = shopData?.data?.products;
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
      
    const bpsData = products.map(async (product) => {
      const params = {
        id: product.id
      };
      const url = addURLParams(`${process.env.NEXT_PUBLIC_API_URL}/products?`, params);

      return await fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        const dataObj = JSON.parse(result).Item;
        // console.log(dataObj)
        return {
          id: dataObj.id,
          title: dataObj.title,
          design: dataObj.design,
          materials: dataObj.materials,
          manufacturing: dataObj.manufacturing,
          logistics: dataObj.logistics,
          care: dataObj.care,
          end: dataObj.end
        }
      })
      .catch(error => console.log('error', error));
    });

    const productFinalData = await Promise.all(bpsData);
    setProductData(productFinalData);
    setRunMutation(true);
  }, [shopData])

  useEffect(() => {
    fetchResponse();
  }, [fetchResponse]);

  useEffect(() => {
    if (checkAllMutations.every(value => value === true) && productData.length + 1 === checkAllMutations.length) {
      console.log('import successful!');
      setIsLoading(false);
      setIsComplete(true);
    }
  }, [checkAllMutations, productData, setIsLoading, setIsComplete]);

  // add more if necessary later
  const metafield_definitions_array = [
    {
      name: "Designer image",
      namespace: "bps",
      key: "designerImage",
      description: "Optional image for the designer of the product",
      type: "file_reference",
      validations: [{
        "name": "file_type_options",
        "value": "[\"Image\"]"
      }]
    }
  ];

  return (
    <>
      {
        runMutation && productData.map((product) => {
          // console.log(product)
          const metafield_inputs_array = createInputArray(product).map((section) => {
            return {
              "key": `${section.section}`,
              "namespace": "bps",
              "ownerId": `${product.id}`,
              "type": "json",
              "value": JSON.stringify(section.data)
            }
          });
          // console.log(metafield_inputs_array);
          const set_metafields_input = {
            "metafields": metafield_inputs_array
          };

          return  (
            <Stack key={product.id} >
              <p>{product.title}</p>
              <MutationPanel 
                MUTATION={SET_METAFIELDS}
                input={set_metafields_input}
                onCompletedAction={() => {setCheckAllMutations([...checkAllMutations, true])}} 
              />
            </Stack>
          )
        })
      }
      {
        runMutation && metafield_definitions_array.map((definition) => {
          const create_metafield_definition_input = {
            "definition": {
              "name": `${definition.name}`,
              "namespace": `${definition.namespace}`,
              "key": `${definition.key}`,
              "description": `${definition.description}`,
              "type": `${definition.type}`,
              "validations": definition.validations,   // must be an array -> empty if none
              "ownerType": "PRODUCT"
            }
          };
          return  (
            <Stack key={definition.key} >
              <p>Creating definitions</p>
              <MutationPanel
                MUTATION={CREATE_METAFIELD_DEFINITION}
                input={create_metafield_definition_input}
                onCompletedAction={() => {setCheckAllMutations([...checkAllMutations, true])}} 
              />
            </Stack>
          )
        })
      }
    </>
  )
}

export default ImportProductStories