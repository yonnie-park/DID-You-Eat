import { prisma } from '../prisma';

const create_collection = async (data: any) => {
  const {
    shop_name,
    collection_uri,
    location,
    location_detail,
    owner_address,
  } = data;
  try {
    const createCollectionRes = await prisma.collection.create({
      data: {
        shop_name,
        collection_uri,
        location,
        location_detail,
        owner_address,
      },
    });
    return createCollectionRes;
  } catch (e) {
    return null;
  }
};

const get_collections_by_address = async (address: string) => {
  const collections = await prisma.collection.findMany({
    where: {
      owner_address: address,
    },
  });
  return collections;
};

export { create_collection, get_collections_by_address };
