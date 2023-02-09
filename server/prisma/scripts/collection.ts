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
    const owner = await prisma.owner.findFirst({ where: { owner_address } });
    if (!owner) await prisma.owner.create({ data: { owner_address } });
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
    console.log(e);
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

const get_collection_by_shop_name = async (shop_name: string) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: { shop_name },
    });
    return collection;
  } catch (e) {
    return null;
  }
};

export {
  create_collection,
  get_collections_by_address,
  get_collection_by_shop_name,
};
