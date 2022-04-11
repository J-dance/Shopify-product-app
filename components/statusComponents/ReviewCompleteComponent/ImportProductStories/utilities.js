export const createInputArray = (product) => {
  return [
    {
      section: 'design',
      data: product.design
    },
    {
      section: 'materials',
      data: product.materials
    },
    {
      section: 'manufacturing',
      data: product.manufacturing
    },
    {
      section: 'logistics',
      data: product.logistics
    },
    {
      section: 'care',
      data: product.care
    },
    {
      section: 'end',
      data: product.end
    },
    {
      section: "settings",
      data: {
        design: true,
        materials: true,
        manufacturing: true,
        logistics: true,
        care: true,
        end: true
      }
    }
  ];
}