import { useState, useContext, useEffect } from 'react';
import MyPageComponent from '../components/MyPageComponent/MyPageComponent';
import { ResourcePicker, useAppBridge} from '@shopify/app-bridge-react';
import { 
  Frame, 
  Layout, 
  Card,   
  EmptyState,
  Button,
  Loading
} from '@shopify/polaris';
import AddFieldsToProducts from '../components/AddFieldsToProducts';
import CsvExporter from '../components/CsvExporter/CsvExporter';
import { Toast } from '@shopify/app-bridge/actions';
import { ShopDataContext } from '../assets/context';
import MyResourceList from '../components/MyResourceList/MyResourceList';
import PopulateResourcList from '../components/PopulateResourceList/PopulateResourcList';

const SelectProducts = (props) => {
  const shopData = useContext(ShopDataContext);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  const [initialSelection, setInitialSelection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const app = useAppBridge();
  const numProductsOnPlan = shopData?.data?.productTier || 3;

  useEffect(() => {
    if ( numProductsOnPlan === shopData?.data?.products.length) {
      console.log('selection complete');
      setIsSelectionComplete(true);
      setIsLoading(false);
      setIsConfirmed(true);
    }
    else if (shopData?.data?.products !== undefined) {
      let initialSelectionIdsArray = shopData?.data?.products.map((productId) => {
        return {
          id: productId.id
        }
      });
      setIsLoading(false);
      setInitialSelection(initialSelectionIdsArray);
    }
  }, [shopData?.data, numProductsOnPlan]);

  const handleSelection = (selectPayload) => {
    // console.log(selectPayload.selection);
    setProducts(selectPayload.selection);
    setIsPickerOpen(false);
  };

  const toastSelectionConfirmed = Toast.create(app, {
    message: 'Products confirmed',
    duration: 5000
  });

  const toastError = Toast.create(app, {
    message: 'Confirmation error',
    isError: true,
    duration: 5000
  });

  const postProductsToTable = async (product) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "id": product.id,
      "title": product.title,
      "owner": shopData?.data.id
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, requestOptions)
    .then(response => response.text())
    .then(result => {
      let res = JSON.parse(result);
      // console.log(res);
      return true
    })
    .catch(error => {
      console.log('error', error);
      return false
    });
  };

  const postProductsToShop = async (productIds) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "id": shopData?.data.id,
      "products": productIds,
      "shopStatus": "upload products"
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop`, requestOptions)
    .then(response => response.text())
    .then(result => {
      let res = JSON.parse(result);
      // console.log(res);
      return true
    })
    .catch(error => {
      console.log('error', error);
      return false
    });
  }

  const handleConfirmation = async() => {
    // for each product, post to product table and update shop table
    let productIds = [];

    const result = products.map(async(product) => {
      productIds.push({
        id: product.id,
        title: product.title
      });
      return await postProductsToTable(product);
    });

    result.push(await postProductsToShop(productIds));
    let resultArray = await Promise.all(result);

    if (resultArray.every(value => value === true)) {
      setIsConfirmed(true);
      toastSelectionConfirmed.dispatch(Toast.Action.SHOW);
    } else {
      toastError.dispatch(Toast.Action.SHOW);
    }
  };
  
  const emptyStateMarkup =
  !products.length ? (
    <EmptyState
      heading= { isSelectionComplete ? "Selection complete" : "Select products for upload"}
      action={{
        content: 'Select products',
        disabled: isSelectionComplete ? true : false,
        onAction:() => {setIsPickerOpen(true)}
      }}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>
        Choose which products to upload for unique product stories
      </p>
    </EmptyState>
  ) : undefined;

  if (isLoading) return <Frame><Loading /></Frame>
  
  return (
    <MyPageComponent
      title="Product selection"
      subtitle={isSelectionComplete ? "View your selected products below" : "Choose which products to upload for their unique product stories"}
      pageName="selectProducts"
      secondaryAction={{
        on: true,
        label: "Select products",
        action: () => {
          setIsPickerOpen(true);
          setIsConfirmed(false);
        } 
      }}
    >
      <Frame>
        <Layout>
          <Layout.Section>
            <Card >
              <Card.Section>
                {
                  isSelectionComplete ? <PopulateResourcList productIds={shopData?.data?.products} /> :
                  <MyResourceList products={products} emptyStateMarkup={emptyStateMarkup} isCompleted={false} />
                }
              </Card.Section>
              {
                isSelectionComplete && <CsvExporter products={products} />
              }
              {
                products.length != 0 && <Card.Section>
                  {
                    isConfirmed ? <CsvExporter products={products} /> :
                    <Button
                    primary
                    onClick={() => handleConfirmation()}
                    >Confirm selection</Button>
                  }
                  </Card.Section>
              }
            </Card>
            {
              products.length != 0 && <Card sectioned>
                <AddFieldsToProducts products={products} />
              </Card>
            }
          </Layout.Section>
          <ResourcePicker 
            resourceType='Product'
            open={isPickerOpen}
            initialSelectionIds={initialSelection}
            selectMultiple={numProductsOnPlan}
            onSelection={(selectPayload) => handleSelection(selectPayload)}
            onCancel={() => setIsPickerOpen(false)}
          />
        </Layout>
      </Frame>
    </MyPageComponent>
  )
}

export default SelectProducts