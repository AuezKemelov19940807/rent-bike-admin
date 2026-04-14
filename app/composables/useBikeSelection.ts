export const useBikeSelection = (bikeId: string) => {
  const selectedBrand = useState<string | null>(
    `selectedBrand-${bikeId}`,
    () => null,
  );
  const selectedModel = useState<string | null>(
    `selectedModel-${bikeId}`,
    () => null,
  );
  const selectedType = useState<string | null>(
    `selectedType-${bikeId}`,
    () => null,
  );

  const setBrand = (brandName: string) => {
    selectedBrand.value = brandName;
    selectedModel.value = null;
  };

  const setModel = (modelName: string) => {
    selectedModel.value = modelName;
  };

  const setType = (typeName: string) => {
    selectedType.value = typeName;
  };

  const initFromBike = (bike: {
    brand?: string;
    model?: string;
    type?: string;
  }) => {
    selectedBrand.value = bike.brand || null;
    selectedModel.value = bike.model || null;
    selectedType.value = bike.type || null;
  };

  return {
    selectedBrand,
    selectedModel,
    selectedType,
    setType,
    setBrand,
    setModel,
    initFromBike,
  };
};
